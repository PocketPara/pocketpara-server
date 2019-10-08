/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 23:40:50
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 00:22:29
 * @ Description: Main route handler for all /keyword requests
 */
import { Router } from 'express';
import KeywordController from '../controller/KeywordController';
import { checkJwt } from '../middleware/checkJwt';

const router: Router = Router();

// Creates a new keyword
router.post('/add', [checkJwt], KeywordController.add);

// Lists all keywords for the current user
router.get('/', [checkJwt], KeywordController.listCurrentUser);

// Edits a keyword
router.patch('/:id', [checkJwt], KeywordController.edit);

// Deletes a keyword
router.delete('/:id', [checkJwt], KeywordController.delete);

export default router;