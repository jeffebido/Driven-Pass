import { credentials } from '@prisma/client';

import prisma from '../db';

export type ICredentialData = Omit<credentials, 'id' | 'createdAt'>;

export async function findAllCredentials(userId: number) {
    const result = await prisma.credentials.findMany({
        where: { userId },
    });

    return result;
}

export async function findCredentialById(id: number) {
    const result = await prisma.credentials.findFirst({
        where: { id },
    });

    return result;
}

export async function findCredentialByOwnerIdAndTitle(userId: number, title: string) {

    const result = await prisma.credentials.findFirst({
        where: {  userId,  title}
    });

    return result;
}

export async function insertCredential(credentialData: ICredentialData) {
    const { userId, title, url, username, password } = credentialData;

    await prisma.credentials.create({
        data: { userId, title, url, username, password },
    });
}

export async function deleteCredential(id: number) {
    await prisma.credentials.delete({
        where: { id },
    });
}
