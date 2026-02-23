import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { LoginDto } from './dto/login.dto';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth - User')
@Controller('auth/user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login as a user' })
  @ApiResponse({ status: 200, description: 'Return JWT access token' })
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.userAuthService.login(loginDto);
  }
}
