import prisma from '../db';
import { users } from '@prisma/client';

export type TypeUserData = Omit<users, 'id'>;

export async function createUser(user: TypeUserData) {
    await prisma.users.create({ data: user });
}

export async function getUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email:email } });
}