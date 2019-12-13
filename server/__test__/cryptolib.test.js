import { encrypt, decrypt } from '../lib/cryptoLib';

describe('Test Crypto Library', () => {
  it('should return the same payload after decryption', () => {
    const sampleString = 'Hey @all,this is a test string !';
    const cipherText = encrypt(sampleString);
    expect(decrypt(cipherText)).toBe(sampleString);
  });
  it('should preserve the type of payload', () => {
    expect(typeof decrypt(encrypt(true))).toBe('boolean');
    expect(typeof decrypt(encrypt(2))).toBe('number');
    expect(typeof decrypt(encrypt({}))).toBe('object');
    expect(typeof decrypt(encrypt([]))).toBe('object');
    expect(typeof decrypt(encrypt(''))).toBe('string');
  });
});
