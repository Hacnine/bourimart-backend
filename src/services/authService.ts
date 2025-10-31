import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_jwt_secret';

export async function registerAdmin(data: { name: string; email: string; password: string; role?: string }): Promise<User> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed,
            role: data.role || 'admin',
        },
    });
    return user as unknown as User;
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } }) as unknown as (User | null);
    if (!user) return null;
    const ok = await bcrypt.compare(password, (user as any).password);
    if (!ok) return null;
    const token = jwt.sign({ sub: (user as any).id, email: user.email, role: (user as any).role }, JWT_SECRET, { expiresIn: '7d' });
    return { token, user };
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET) as any;
    } catch (e) {
        return null;
    }
}

export default { registerAdmin, login, verifyToken };
