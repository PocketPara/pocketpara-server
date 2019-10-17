/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:01:58
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 12:05:56
 * @ Description: Main route handler for all /user requests
 */

import { Router } from 'express';
import UserController from "../controller/UserController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import Role from '../enums/Role';

const router = Router();

// Get current user
router.get(
    '/current',
    [checkJwt],
    UserController.current
);
// Edit current user
router.patch(
    '/current',
    [checkJwt],
    UserController.editCurrentUser
);

// Get all users
router.get(
    '/', 
    [checkJwt, checkRole([Role.ADMIN])], 
    UserController.listAll
);

// Get one user
router.get(
    '/:id([0-9]+)',
    [checkJwt, checkRole([Role.ADMIN])],
    UserController.getOneById
);

// Create a new user
router.post(
    '/add', 
    [checkJwt, checkRole([Role.ADMIN])], 
    UserController.newUser
);

// Edit a user
router.patch(
    '/:id([0-9]+)',
    [checkJwt, checkRole([Role.ADMIN])],
    UserController.editUser
);

// Delete a user
router.delete(
    '/:id([0-9]+)',
    [checkJwt, checkRole([Role.ADMIN])],
    UserController.deleteUser
);

export default router;