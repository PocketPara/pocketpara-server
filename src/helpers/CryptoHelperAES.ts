/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 16:58:48
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 21:27:44
 * @ Description: AES Encryption wrapper for simplified use
 */
import * as crypto from 'crypto';
import config from '../config/config';

export default class CryptoHelperAES {

    static encrypt(plaintext, pwdSuffix: string = "") {
        const iv: Buffer = crypto.randomBytes(config.cryptography.symmetrical.initVectorLength);
        const cipher = crypto.createCipheriv(
            config.cryptography.symmetrical.algorithm, 
            Buffer.from(config.cryptography.symmetrical.key + pwdSuffix, 'hex'), 
            iv
        );

        let encrypted = cipher.update(plaintext);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    static decrypt(ciphertext, pwdSuffix: string = "") {
        const [iv, encryptedText] = ciphertext.split(':').map(part => Buffer.from(part, 'hex'));
        const decipher  = crypto.createDecipheriv(
        config.cryptography.symmetrical.algorithm, 
            Buffer.from(config.cryptography.symmetrical.key + pwdSuffix, 'hex'), 
            iv
        );
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

}