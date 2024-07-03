// const salt = 8;
import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}

export async function decodePassword(rawPassword: string, hashPassword: string): Promise<boolean> {

  return bcrypt.compare(rawPassword, hashPassword);
} 