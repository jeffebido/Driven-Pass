import { Request, Response } from 'express';

import * as wifiService from '../services/wifiService';

export async function getAllWifis(req: Request, res: Response) {
    const { userId } = res.locals;

    const wifis = await wifiService.getAllDecryptedWifis(userId);

    res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
    const { id } = req.params;


    const wifi = await wifiService.getDecryptedWifiById(+id);

    res.status(200).send(wifi);
}

export async function createWifi(req: Request, res: Response) {
    const { userId } = res.locals;
    const { title, network, password } = req.body;

    await wifiService.createWifi({ userId, title, network, password });

    res.status(201).send();
}

export async function deleteWifi(req: Request, res: Response) {
    const { id } = req.params;

    await wifiService.deleteWifi(+id);

    res.status(200).send();
}
