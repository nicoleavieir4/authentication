import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserRegistration, Prisma } from '@prisma/client';
import { IUserRepository, USER_REPOSITORY } from '../interfaces/iuser.repository';
import { IUserService } from '../interfaces/iuser.service';
import { decodePassword, encodePassword } from 'src/core/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: Prisma.UserRegistrationCreateInput): Promise<UserRegistration> {
    const formattedData = {
      email: data.email,
      password: encodePassword(data.password),
    };
    return this.userRepository.create(formattedData);
  }

  async findById(id: number): Promise<UserRegistration | null> {
    return this.userRepository.findById(id);
  }
  async findOne(email: string, password: string): Promise<UserRegistration | null> {

    const user = await this.userRepository.findOne(email);
    
    if (!user || !(await decodePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.findOne(email, password);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
 