import Cryptr from 'cryptr';

import * as credentialRepository from '../repositories/credentialRepository';

import * as error from '../utils/errors'


export async function getCredentialById(id: number) {
    const credential = await credentialRepository.findCredentialById(id);

    if (!credential) {
        throw error.notFound();
    }

    return credential;
}

export async function getAllDecryptedCredentials(userId: number) {

    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

    const credentials = await credentialRepository.findAllCredentials(userId);

    const decryptedCredentials = credentials.map((credential) => ({ ...credential, password: cryptr.decrypt(credential.password) }));

    return decryptedCredentials;
}

export async function getDecryptedCredentialById(id: number) {


    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

    const credential = await getCredentialById(id);

    const decryptedCredential = { ...credential, password: cryptr.decrypt(credential.password) };

    return decryptedCredential;
}

export async function createCredential(credentialData: credentialRepository.ICredentialData) {

    const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

    const { userId, title, url, username, password } = credentialData;

    const duplicatedCredential = await credentialRepository.findCredentialByOwnerIdAndTitle(userId, title);

    if (duplicatedCredential) {
        throw error.conflict();
    }

    await credentialRepository.insertCredential({ userId, title, url, username, password: cryptr.encrypt(password) });
}

export async function deleteCredential(id: number) {

    await credentialRepository.deleteCredential(id);
}
