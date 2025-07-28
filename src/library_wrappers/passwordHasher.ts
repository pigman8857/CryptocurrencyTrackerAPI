// bcrypt-hasher.ts
import * as bcrypt from 'bcrypt';

export class PasswordHasher {
  private static readonly saltRounds = 12;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  static async verify(password: string, storedHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedHash);
  }
}
