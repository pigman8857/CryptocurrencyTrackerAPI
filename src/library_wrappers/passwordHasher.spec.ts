
import { PasswordHasher } from "./passwordHasher";

describe('BcryptHasherWrapper', () => {
  const password = 'SecureP@ssw0rd!';

  afterEach(() => {
    jest.resetAllMocks(); // resets all mock implementations and call history
  });

  it('should hash a password and return a string', async () => {
    const hash = await PasswordHasher.hash(password);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should verify a correct password', async () => {
    const hash = await PasswordHasher.hash(password);
    const isValid = await PasswordHasher.verify(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const hash = await PasswordHasher.hash(password);
    const isValid = await PasswordHasher.verify('WrongPassword!', hash);
    expect(isValid).toBe(false);
  });
});
