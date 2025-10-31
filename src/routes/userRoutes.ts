import { Router } from 'express';
import UserController from '../controllers/userController';

export default function userRoutes() {
    const router = Router();
    const userController = new UserController();

    router.post('/', userController.createUser.bind(userController));
    router.get('/:id', userController.getUser.bind(userController));
    router.put('/:id', userController.updateUser.bind(userController));
    router.delete('/:id', userController.deleteUser.bind(userController));

    return router;
}