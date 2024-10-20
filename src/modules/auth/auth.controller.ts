import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormType } from 'src/common/enums/form-type.enum';
import { SendOtpDto, VerifyOtpDto } from './dto/otp.dto';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("send-otp")
  @ApiOperation({ summary: "Insert a phone number and receive an OTP" })
  @ApiConsumes(FormType.UrlEncoded, FormType.Json)
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post("verify-otp")
  @ApiOperation({ summary: "Insert the phone number and the received OTP to get access and refresh token" })
  @ApiConsumes(FormType.UrlEncoded, FormType.Json)
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
