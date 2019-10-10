/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 16:59:45
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:01:56
 * @ Description: Main route handler for all /auth requests
 */

import { Router } from 'express';
import AuthController from "../controller/AuthController";

const router: Router = Router();

// Login route
router.post('/login', AuthController.login);

// Register route
router.post('/register', AuthController.register);

// Change password
// Currently Disabled, because data needs to be re-crypted with a new key
//router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;