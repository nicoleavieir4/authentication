import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/iuser.repository";
import { UserRegistration, Prisma } from '@prisma/client';
import { PrismaService } from "src/prisma/service/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findById(id: number): Promise<UserRegistration | null> {
    return this.prismaService.userRegistration.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<UserRegistration[]> {
    return this.prismaService.userRegistration.findMany();
  }

  async findOne(email: string): Promise<UserRegistration | null> {
    return this.prismaService.userRegistration.findFirst({
      where: { email },
    });
  }

  async create(data: any): Promise<UserRegistration> {
    return this.prismaService.userRegistration.create({ data: { ...data } });
  }

  async update(where: Prisma.UserRegistrationWhereUniqueInput, data: Prisma.UserRegistrationUpdateInput): Promise<UserRegistration> {
    return this.prismaService.userRegistration.update({ where, data });
  }

  async delete(where: Prisma.UserRegistrationWhereUniqueInput): Promise<UserRegistration> {
    return this.prismaService.userRegistration.delete({ where });
  }
}
