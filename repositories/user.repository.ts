import {Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(email: string, password: string) {
        try {
            return await prisma.user.create({
                data: {
                    email,
                    password,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error('A user with this email already exists');
                }
            }
            throw error;
        }
    }

    async findUserById(userId: number) {
        return prisma.user.findUnique({ where: { id: userId } });
    }

    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
}