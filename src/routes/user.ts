/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:01:58
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 17:32:12
 * @ Description: Main route handler for all /user requests
 */

import { Router } from 'express';
import UserController from "../controller/UserController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

// Get all users
router.get(
    '/', 
    [checkJwt, checkRole(["ADMIN"])], 
    UserController.listAll
);

// Get one user
router.get(
    '/:id([0-9]+)',
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);

// Create a new user
router.post(
    '/', 
    [checkJwt, checkRole(["ADMIN"])], 
    UserController.newUser
);

// Edit a user
router.patch(
    '/:id([0-9]+)',
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
);

// Delete a user
router.patch(
    '/:id([0-9]+)',
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
);

export default router;