import { Router } from 'express';
import AuthController from '../controllers/authController';

export default function authRoutes() {
    const router = Router();
    const auth = new AuthController();

    router.post('/register', auth.register.bind(auth));
    router.post('/login', auth.login.bind(auth));

    return router;
}
