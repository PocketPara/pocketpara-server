/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 19:54:46
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 21:07:58
 * @ Description: Main route handler for all /car requests
 */

import { Router } from 'express';
import { checkJwt } from "../middleware/checkJwt";
import CarController from '../controller/CarController';

const router: Router = Router();

// Creates a new car
router.post('/add', [checkJwt], CarController.add);

// Lists all cars for the current user
router.get('/', [checkJwt], CarController.listCurrentUser);

// Edits a car
router.patch('/:id', [checkJwt], CarController.edit);

// Deletes a car
router.delete('/:id', [checkJwt], CarController.delete);

export default router;