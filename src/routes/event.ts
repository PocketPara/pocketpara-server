/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 22:59:32
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 13:50:05
 * @ Description: Main route handler for all /event requests
 */
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import UserEventController from '../controller/UserEventController';

const router: Router = Router();

// Creates a new event
router.post('/add', [checkJwt], UserEventController.add);

// Lists all events for the current user
router.get('/', [checkJwt], UserEventController.listCurrentUser);

// Edits an event
router.patch('/:id', [checkJwt], UserEventController.edit);

// Deletes an event
router.delete('/:id', [checkJwt], UserEventController.delete);


export default router;