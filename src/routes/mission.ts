/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:49:18
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:53:53
 * @ Description: Main route handler for all /mission requests
 */
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import MissionController from '../controller/MissionController';

const router: Router = Router();

// Creates a new mission
router.post('/add', [checkJwt], MissionController.add);

// Lists all missions
router.get('/', [checkJwt], MissionController.list);

// Edits a mission
router.patch('/:id', [checkJwt], MissionController.edit);

// Deletes a mission
router.delete('/:id', [checkJwt], MissionController.delete);

export default router;