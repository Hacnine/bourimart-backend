import { Request, Response, NextFunction } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
    const token = process.env.ADMIN_TOKEN;
    if (!token) {
        console.warn('ADMIN_TOKEN not set; admin routes are unprotected');
        return res.status(500).json({ message: 'Server misconfiguration: ADMIN_TOKEN missing' });
    }

    // Accept Bearer <token> or x-admin-key header
    const authHeader = (req.headers.authorization as string) || '';
    const provided = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : (req.headers['x-admin-key'] as string | undefined);

    if (!provided || provided !== token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

export default adminAuth;
