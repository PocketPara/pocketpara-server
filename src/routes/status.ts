/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 15:09:56
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-08 15:13:38
 * @ Description: Main route handler for all /status requests
 */
import { Router } from 'express';
import StatusController from '../controller/StatusController';

const router: Router = Router();

// Status route
router.get('/', StatusController.currentStatus)

export default router;