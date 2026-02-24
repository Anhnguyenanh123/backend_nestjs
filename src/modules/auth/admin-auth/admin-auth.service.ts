import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminsService } from '../../admins/admins.service';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(adminLoginDto: AdminLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = adminLoginDto;
    const admin = await this.adminsService.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Email does not exist');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
