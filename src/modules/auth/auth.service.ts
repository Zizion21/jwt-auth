import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Otp } from '../user/entities/otp.entity';
import { SendOtpDto, VerifyOtpDto } from './dto/otp.dto';
import { randomInt } from 'crypto';
import { AuthMessages } from 'src/common/enums/messages.enum';
import { JwtService } from '@nestjs/jwt';
import { TokensPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    private jwtService: JwtService,
  ) { }
  async sendOtp(sendOtpDto: SendOtpDto) {
    const { mobile } = sendOtpDto;
    let user = await this.userRepo.findOneBy({ mobile });

    if (!user) {
      user = this.userRepo.create({ mobile });
      user = await this.userRepo.save(user);
    }

    await this.generateOtp(user);
    return {
      message: "OTP sent."
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { code, mobile } = verifyOtpDto;
    const now = new Date();
    const user = await this.userRepo.findOne({
      where: { mobile },
      relations: {
        otp: true
      }
    });

    if (!user || !user.otp)
      throw new UnauthorizedException(AuthMessages.UserNotFound);

    const otp = user?.otp;
    if (otp?.code !== code)
      throw new UnauthorizedException(AuthMessages.IncorrectOtp);
    if (otp?.expires_in < now)
      throw new UnauthorizedException(AuthMessages.OtpExpired);

    if (!user.mobile_verified) {
      await this.userRepo.update(
        { id: user.id },
        { mobile_verified: true }
      )
    }

    const { accessToken, refreshToken } = this.generateJwt({ id: user.id });
    return {
      accessToken,
      refreshToken
    }
  }

  async generateOtp(user: User) {
    const { id: userId } = user;
    const expires_in = new Date(new Date().getTime() + 1000 * 60 * 2);
    let otp = await this.otpRepo.findOneBy({ userId });
    const code = randomInt(10000, 99999).toString();

    if (otp) {
      if (otp.expires_in > new Date())
        throw new BadRequestException(AuthMessages.OtpNotExpired);

      otp.code = code;
      otp.expires_in = expires_in;
    } else {
      otp = this.otpRepo.create({ code, expires_in, userId });
      user.otpId = otp.id;
    }

    otp = await this.otpRepo.save(otp);
    user.otpId = otp.id;

    await this.userRepo.save(user);
  }

  generateJwt(payload: TokensPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "1d"
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "7d"
    });

    return {
      accessToken,
      refreshToken
    }
  }

  async validateAccessToken(token: string) {
    try {
      const payload = this.jwtService.verify<TokensPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET
      });

      if (typeof payload === "object" && payload?.id) {
        const user = await this.userRepo.findOneBy({ id: payload.id });
        if (!user)
          throw new UnauthorizedException(AuthMessages.SignUpFirst);

        return user;
      }
    } catch (error) {
      throw new UnauthorizedException(AuthMessages.LogInFirst)
    }
  }
}
