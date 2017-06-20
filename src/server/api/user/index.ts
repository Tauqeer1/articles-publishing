import * as express  from 'express';
import userController from './user.controller';


const router: express.Router = express.Router();

router.get('/', userController.readAllUsers);
router.get('/:id', userController.readUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
