import { Request, Response } from 'express';

import * as credentialService from '../services/credentialService';

export async function getAllCredentials(req: Request, res: Response) {
    const { userId } = res.locals;

    const credentials = await credentialService.getAllDecryptedCredentials(userId);

    res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
    const { id } = req.params;
    

    const credential = await credentialService.getDecryptedCredentialById(+id);

    res.status(200).send(credential);
}

export async function createCredential(req: Request, res: Response) {
    const { userId } = res.locals;
    const { title, url, username, password } = req.body;

    await credentialService.createCredential({ userId, title, url, username, password });

    res.status(201).send();
}

export async function deleteCredential(req: Request, res: Response) {
    const { id } = req.params;

    await credentialService.deleteCredential( +id );

    res.status(200).send();
}
