/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 19:44:10
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:00:50
 * @ Description: Main route handler for all /medical-category requests
 */
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import MedicalCategoryController from '../controller/MedicalCategoryController';
import { checkRole } from '../middleware/checkRole';
import Role from '../enums/Role';
// import { checkRole } from '../middleware/checkRole';//-> for admin operations

const router: Router = Router();

// Lists all by language
router.get('/:language', [checkJwt,checkRole([Role.TRA_MISSION_TRACKER])], MedicalCategoryController.listLanguage);

export default router;