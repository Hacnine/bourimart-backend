import { Request, Response } from 'express';
import * as authService from '../services/authService';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password required' });
            const user = await authService.registerAdmin({ name, email, password, role: 'admin' });
            return res.status(201).json({ id: (user as any).id, email: user.email, name: user.name });
        } catch (err: any) {
            console.error('register error', err);
            return res.status(500).json({ message: err?.message || err });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ message: 'email and password required' });
            const result = await authService.login(email, password);
            if (!result) return res.status(401).json({ message: 'Invalid credentials' });
            return res.json({ token: result.token, user: { id: (result.user as any).id, email: result.user.email, name: result.user.name } });
        } catch (err: any) {
            console.error('login error', err);
            return res.status(500).json({ message: err?.message || err });
        }
    }
}

export default AuthController;
