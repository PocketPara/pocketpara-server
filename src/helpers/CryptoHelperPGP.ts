/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 17:30:45
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 18:10:33
 * @ Description: PGP encryption wrapper for simplified use
 */
import openpgp from 'openpgp';
import config from "../config/config";

export default class CryptoHelperPGP {

    static async generateKeyPair(username, mail, password): Promise<any> {
        const options = {
            userIds: [{ name: username, email: mail }],
            rsaBits: config.cryptography.asymmetrical.keySize,
            passphrase: config.cryptography.asymmetrical.passphrasePrefix + password + "_"
        };
        return new Promise( (resolve, reject) => {
            openpgp.generateKey(options).then( keys => {
                resolve({
                    privateKey: keys.privateKeyArmored,
                    publicKey: keys.publicKeyArmored,
                    revocationCertificate: keys.revocationCertificate
                });
            }).catch(error => {
                reject(error);
            });
        });
        
    }

};