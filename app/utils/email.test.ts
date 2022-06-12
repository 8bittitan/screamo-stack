import { validateEmail } from './email.server';

describe('validateEmail', () => {
  it('should return false for not valid email', () => {
    let email = '';
    expect(validateEmail(email)).toBe(false);
    email = 'test';
    expect(validateEmail(email)).toBe(false);
    email = 'test.com';
    expect(validateEmail(email)).toBe(false);
    email = 'test+124.com';
    expect(validateEmail(email)).toBe(false);
    email = 'jf';
    expect(validateEmail(email)).toBe(false);
  });

  it('should return true for valid email', () => {
    const email = 'test@account.com';
    expect(validateEmail(email)).toBe(true);
  });
});
