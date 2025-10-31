import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_jwt_secret';

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = (req.headers.authorization as string) || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        // attach user to request
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        (req as any).user = user;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
}

export default { ensureAuthenticated, ensureAdmin };
