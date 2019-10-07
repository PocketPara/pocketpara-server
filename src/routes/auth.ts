/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 16:59:45
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 17:31:51
 * @ Description: Main route handler for all /auth requests
 */

import { Router } from 'express';
import AuthController from "../controller/AuthController";
import {checkJwt} from "../middleware/checkJwt";

const router = Router();
// Login route
router.post('/login', AuthController.login);

// Change password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;