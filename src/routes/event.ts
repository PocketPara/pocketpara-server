/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 22:59:32
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 23:33:25
 * @ Description: Main route handler for all /event requests
 */
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';
import Role from '../enums/Role';
import UserEventController from '../controller/UserEventController';

const router: Router = Router();

// Creates a new event
router.post('/add', [checkJwt,checkRole([Role.CUSTOMIZE_EVENTS])], UserEventController.add);

// Lists all events for the current user
router.get('/', [checkJwt,checkRole([Role.CUSTOMIZE_EVENTS])], UserEventController.listCurrentUser);

// Edits an event
router.patch('/:id', [checkJwt,checkRole([Role.CUSTOMIZE_EVENTS])], UserEventController.edit);

// Deletes an event
router.delete('/:id', [checkJwt,checkRole([Role.CUSTOMIZE_EVENTS])], UserEventController.delete);


export default router;