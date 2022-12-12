import prisma from '../db';
import { users } from '@prisma/client';

export async function findById(id: number) {

    return prisma.users.findUnique({
        where: { id }
    });
  }