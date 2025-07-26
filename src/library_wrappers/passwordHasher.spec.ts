
import { PasswordHasher } from "./passwordHasher";

describe('BcryptHasherWrapper', () => {
  const password = 'SecureP@ssw0rd!';

  afterEach(() => {
    jest.resetAllMocks(); // resets all mock implementations and call history
  });

  it('should hash a password in salt.hash format', async () => {
    const result = await PasswordHasher.hash(password);
    expect(result).toMatch(/^[A-Za-z0-9./$]{22}\.[A-Za-z0-9./$]{31}$/);
  });

  xit('should verify a valid password against hashed result', async () => {
   
    const hashed = await PasswordHasher.hash(password);

    const isValid = await PasswordHasher.verify(password, hashed);
    expect(isValid).toBe(true);
  });

  it('should reject an invalid password', async () => {
    const hashed = await PasswordHasher.hash(password);
    const isValid = await PasswordHasher.verify('WrongPassword', hashed);
    expect(isValid).toBe(false);
  });

  it('should fail gracefully if the hash format is incorrect', async () => {
    const result = await PasswordHasher.verify(password, 'invalid.hash');
    expect(result).toBe(false);
  });
});
