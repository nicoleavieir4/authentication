import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { decodePassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string, 
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email, password);

    if (!user || !await decodePassword(password, user.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken }; // Ajustado para retornar diretamente o objeto { access_token: string }
  }
}
