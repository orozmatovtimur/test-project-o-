import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // 


  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async validateLogin(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return this.login(user);
  }
  

}
