/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:29:51
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 18:02:27
 * @ Description: Main config file for the server
 */

export default {
    // Jsonwebtoken crypto-key, feel free to change (prod-key is saved elsewhere later on)
    jwtSecret: 'UAUg3PwB^A?7wY9UcXpJk/!3d~kT6ft<',
    // Session duration for jsonwebtoken (format: https://github.com/zeit/ms)
    sessionDuration: "365d" // super-long for development
};