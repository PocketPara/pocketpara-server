/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:29:51
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-08 15:27:15
 * @ Description: Main config file for the server
 */

export default {
    // The super-route (the base path of the api, e.g. / or /api)
    // every other route will be below this one
    apiEndpoint: '/',
    // The port the server will start on
    apiPort: 3000,
    // Jsonwebtoken crypto-key, feel free to change (prod-key is saved elsewhere later on)
    jwtSecret: 'UAUg3PwB^A?7wY9UcXpJk/!3d~kT6ft<',
    // Session duration for jsonwebtoken (format: https://github.com/zeit/ms)
    sessionDuration: "30d" // super-long for development
};