/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 16:58:48
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:33:03
 * @ Description: AES Encryption wrapper for simplified use
 */
//import * as crypto from 'crypto';
import config from '../config/config';
import * as aes256 from 'aes256';

export default class CryptoHelperAES {

    static encrypt(plaintext: string, pwdSuffix: string = ""): string {
        return aes256.encrypt(config.cryptography.symmetrical.key + pwdSuffix, plaintext);
    }
    static decrypt(ciphertext: string, pwdSuffix: string = ""): string {
        return aes256.decrypt(config.cryptography.symmetrical.key + pwdSuffix, ciphertext);
    }

    /*
    Previous encryption (manually using crypto)
    
    static encrypt(plaintext, pwdSuffix: string = "") {
        const iv: Buffer = crypto.randomBytes(config.cryptography.symmetrical.initVectorLength);
        const cipher = crypto.createCipheriv(
            config.cryptography.symmetrical.algorithm, 
            Buffer.from(config.cryptography.symmetrical.key + pwdSuffix, 'hex'), 
            iv.slice(0, config.cryptography.symmetrical.initVectorLength)
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
            iv.slice(0, config.cryptography.symmetrical.initVectorLength)
        );
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }*/

}