/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 22:19:12
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-21 22:35:42
 * @ Description: Main route handler for all /shift requests
 */
import { Router } from 'express';
import ShiftController from "../controller/ShiftController";
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';
import Role from '../enums/Role';

const router: Router = Router();

// Adds a new shift
router.post('/add', [checkJwt,checkRole([Role.TRA_SHIFT_TRACKER])], ShiftController.add);

// Lists all shifts
router.get('/', [checkJwt,checkRole([Role.TRA_SHIFT_TRACKER])], ShiftController.listCurrentUser);

// Edits a shift
router.patch('/:id', [checkJwt,checkRole([Role.TRA_SHIFT_TRACKER])], ShiftController.edit);

// Lists all colleagues
router.get('/colleagues', [checkJwt,checkRole([Role.TRA_SHIFT_TRACKER])], ShiftController.listColleagues)

export default router;