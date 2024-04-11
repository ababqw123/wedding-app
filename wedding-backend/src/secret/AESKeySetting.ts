import { scrypt } from 'crypto';
import { promisify } from 'util';

export class SetAES {
  /** 암호화 key 값 발급 */
  static async setting(): Promise<{ iv: Buffer; key: Buffer }> {
    const iv = Buffer.from('abcdefghijkl_dev');
    const password = Buffer.from(
      'ZDkwMjUwYzItYzcxYS00OTM0LWE0NjktZTNjNGU5ZTRlMTJlCg==',
      'base64',
    );
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    return {
      iv: iv,
      key: key,
    };
  }
}
