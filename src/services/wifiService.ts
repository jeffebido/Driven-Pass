import * as wifiRepository from '../repositories/wifiRepository';
import * as error from '../utils/errors'

import Cryptr from 'cryptr';

export async function getWifiById(id: number) {
    const wifi = await wifiRepository.findWifiById(id);

    if (!wifi) {
        throw error.notFound();
    }

    return wifi;
}

export async function getAllDecryptedWifis(userId: number) {

    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

    const wifis = await wifiRepository.findAllWifis(userId);

    const decryptedWifis = wifis.map((wifi) => ({
        ...wifi,
        password: cryptr.decrypt(wifi.password),
    }));

    return decryptedWifis;
}

export async function getDecryptedWifiById(id: number) {

    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);


    const wifi = await getWifiById(id);

    const decryptedWifi = { ...wifi, password: cryptr.decrypt(wifi.password) };

    return decryptedWifi;
}

export async function createWifi(wifiData: wifiRepository.IWifiData) {

    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

    const { userId, title, network, password } = wifiData;

    await wifiRepository.insertWifi({
        userId,
        title,
        network,
        password: cryptr.encrypt(password),
    });
}

export async function deleteWifi(id: number) {
    await getWifiById(id);

    await wifiRepository.deleteWifi(id);
}
