import { createCipheriv, createDecipheriv } from 'crypto';

/** 암호화 */
export function encodeAES256(textToEncrypt: string, setting): string {
  const key = setting.key;
  const iv = setting.iv;
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);
  return encryptedText.toString('base64');
}

/** 복호화 */
export function decodeAES256(textToDecrypt: string, setting): string {
  const key = setting.key;
  const iv = setting.iv;
  const encryptedText = Buffer.from(textToDecrypt, 'base64');
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decryptedText.toString();
}
