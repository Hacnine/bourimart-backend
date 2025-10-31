import { PrismaClient } from '@prisma/client';
import { User, CreateUserDto } from '../types';

export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async registerUser(data: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }

    async removeUser(id: string): Promise<User | null> {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        return user;
    }
}