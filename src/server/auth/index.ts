import * as express from 'express';
import authController from './auth.controller';

const router: express.Router = express.Router();

router.get('/:token', authController.verifyToken);
router.post('/', authController.signin);

export default router;
