import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { USER_REPOSITORY } from './interfaces/iuser.repository';
import { UserService } from './services/user.service';
import { USER_SERVICE } from './interfaces/iuser.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY', // Use a chave secreta do ambiente ou a padrão
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [USER_REPOSITORY, USER_SERVICE],
})
export class UserModule { }
