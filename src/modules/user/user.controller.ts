import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/common/decorators/auth.decorator';

@Controller('user')
@ApiTags("Users Section👤")
@UserAuthGuard()
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get("profile")
  getProfile() {
    return this.userService.getProfile();
  }
}
