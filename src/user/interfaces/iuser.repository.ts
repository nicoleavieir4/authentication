export const USER_REPOSITORY = "USER_REPOSITORY"

import { UserRegistration, Prisma } from '@prisma/client';

export interface IUserRepository {
  findById(id: number): Promise<UserRegistration | null>;
  findOne(email: string): Promise<UserRegistration | null>
  findMany(): Promise<UserRegistration[]>;
  create(data: any): Promise<UserRegistration>;
  update(where: Prisma.UserRegistrationWhereUniqueInput, data: Prisma.UserRegistrationUpdateInput): Promise<UserRegistration>;
  delete(where: Prisma.UserRegistrationWhereUniqueInput): Promise<UserRegistration>;
}