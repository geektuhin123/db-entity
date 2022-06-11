/** Cipher Helper which helps with encryption and decryption */
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import config from '../config/config';
import { ValidationError } from './error';

const { salt } = config.server;
const key = config.server.encryptionKey;
const defaultExtraSalt = config.server.extraSalt;
const algorithm = 'aes-256-cbc';
const hashAlgorithm = 'md5';

/**
 * Encryption function which encrypts the given string
 * @param text : String - Text that needs to be encrypted
 * @param extraSalt : String - Extra dynamic salt to improve the taste
 *
 * @returns : String - Encrypted String
 */
const encrypt = (text: string, extraSalt = defaultExtraSalt): string => {
  try {
    const iv = key.slice(0, 16);
    const cipher = createCipheriv(algorithm, extraSalt + key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    throw new ValidationError(`Encryption fails, ${error}`);
  }
};

/**
 * Encryption function which encrypts the given string
 * @param text : String - Text that needs to be encrypted
 * @param extraSalt : String - Extra dynamic salt to improve the taste
 *
 * @returns : String - Encrypted String
 */
const hashEncrypt = (text: string, extraSalt = defaultExtraSalt): string => {
  const cipher = createHash(hashAlgorithm);
  cipher.update(text + salt + extraSalt);
  const encrypted = cipher.digest('hex');
  return encrypted;
};

/**
 * Decryption function which decrypts the given string and return back original string
 * @param passPhrase : String - Text that needs to be decrypted
 * @param extraSalt : String - Extra dynamic salt to improve the taste
 *
 * @returns : String - Decrypted String
 */
const decrypt = (passPhrase: string, extraSalt = defaultExtraSalt): string => {
  try {
    const iv = key.slice(0, 16);
    const decipher = createDecipheriv(algorithm, extraSalt + key, iv);
    let decrypted = decipher.update(passPhrase, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new ValidationError(`Decryption fails, ${error}`);
  }
};

export { encrypt, decrypt, hashEncrypt };
