import Role from "../enums/Role";

/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:29:51
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 12:48:17
 * @ Description: Main config file for the server
 */

export default {
    // The super-route (the base path of the api, e.g. / or /api)
    // every other route will be below this one
    apiEndpoint: '/',
    // The port the server will start on
    apiPort: 3001,
    // Available languages
    permittedLangs: ["en","de"],
    // Default roles of normal users
    userDefaultRoles: [
        // tracking system
        Role.TRA_SHIFT_TRACKER,
        Role.TRA_SHIFT_STATISTICS,
        Role.TRA_MISSION_STATISTICS,
        Role.TRA_MISSION_TRACKER
        // medical system
        //TODO: add here and manually to users after development is done
    ],
    // Jsonwebtoken crypto-key, feel free to change (prod-key is saved elsewhere later on)
    jwtSecret: 'UAUg3PwB^A?7wY9UcXpJk/!3d~kT6ft<',
    // Session duration for jsonwebtoken (format: https://github.com/zeit/ms)
    sessionDuration: "30d", // long for development,
    // All crypto-options
    cryptography: {
        symmetrical: {
            // Encryption key
            key: '21f49d09bd888cc45b85dcd6d09e0f761f1f1b63f7ff155c31a7c0c8b6b7addd'
        },
        asymmetrical: {
            // Key size in bits
            keySize: 4096,
            // Prefix/Salt
            passphrasePrefix: '_pocketParaServerGenerated_'
        }
    }
};