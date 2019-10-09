/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 22:19:12
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 22:44:48
 * @ Description: Main route handler for all /shift requests
 */
import { Router } from 'express';
import ShiftController from "../controller/ShiftController";
import { checkJwt } from '../middleware/checkJwt';

const router: Router = Router();

// Adds a new shift
router.post('/add', [checkJwt], ShiftController.add);

// Lists all shifts
router.get('/', [checkJwt], ShiftController.listCurrentUser);

export default router;