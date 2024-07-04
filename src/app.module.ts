import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY', signOptions: { expiresIn: '1h' }, // Tempo de expiração do token JWT
    }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule { }