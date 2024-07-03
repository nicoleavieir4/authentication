import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '../interfaces/iuser.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly iUserService: IUserService,
  ) {}

  @Post('/')
  async create(@Body() data: any) {
    const user = await this.iUserService.create(data);
    return user;
  }

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const accessToken = await this.iUserService.signIn(email, password);
    return { access_token: accessToken };
  }
}
