// bcrypt-hasher.ts
import * as bcrypt from 'bcrypt';

export class PasswordHasher {
  private static readonly saltRounds = 12;

  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // Extract the 22-character salt from the bcrypt hash string
    // Format: $2b$12$[22 char salt][31 char hash]
    const extractedSalt = hash.split('$')[3].substring(0, 22);
    const passwordHash = hash.substring(hash.length - 31); // hash without salt

    return `${extractedSalt}.${passwordHash}`;
  }

  static async verify(password: string, stored: string): Promise<boolean> {
    const [salt, hash] = stored.split('.');
    const fullHash = `$2b$${this.saltRounds.toString().padStart(2, '0')}$${salt}${hash}`;
    return bcrypt.compare(password, fullHash);
  }
}
