/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 19:54:46
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 21:59:43
 * @ Description: Main route handler for all /car requests
 */

import { Router } from 'express';
import { checkJwt } from "../middleware/checkJwt";
import CarController from '../controller/CarController';
import { checkRole } from '../middleware/checkRole';
import Role from '../enums/Role';

const router: Router = Router();

// Creates a new car
router.post('/add', [checkJwt,checkRole([Role.CUSTOMIZE_CARS])], CarController.add);

// Lists all cars for the current user
router.get('/', [checkJwt,checkRole([Role.CUSTOMIZE_CARS])], CarController.listCurrentUser);

// Edits a car
router.patch('/:id', [checkJwt,checkRole([Role.CUSTOMIZE_CARS])], CarController.edit);

// Deletes a car
router.delete('/:id', [checkJwt,checkRole([Role.CUSTOMIZE_CARS])], CarController.delete);

export default router;