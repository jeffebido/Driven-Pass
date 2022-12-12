import { networks } from '@prisma/client';
import prisma from '../db';

export type IWifiData = Omit<networks, 'id' | 'createdAt'>;

export async function findAllWifis(userId: number) {
    const result = await prisma.networks.findMany({
        where: { userId },
    });

    return result;
}

export async function findWifiById(id: number) {
    const result = await prisma.networks.findFirst({
        where: { id },
    });

    return result;
}

export async function insertWifi(wifiData: IWifiData) {
    const { userId, title, network, password } = wifiData;

    await prisma.networks.create({
        data: { userId, title, network, password },
    });
}

export async function deleteWifi(id: number) {
    await prisma.networks.delete({
        where: { id },
    });
}
