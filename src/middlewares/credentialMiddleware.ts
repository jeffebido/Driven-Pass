import { Request, Response, NextFunction } from 'express';

import  credentialSchema  from "../schemas/credentialSchema";

export async function credentialMiddleware(req:Request, res:Response, next:NextFunction) {
    
    const validate = credentialSchema.validate(req.body);

    if (validate.error) {
        return res.status(422).send(validate.error);
    }   

    next();
}


