import { Request, Response, NextFunction } from 'express';

import  wifisSchema  from "../schemas/wifisSchema";

export async function wifisMiddleware(req:Request, res:Response, next:NextFunction) {
    
    const validate = wifisSchema.validate(req.body);

    if (validate.error) {
        return res.status(422).send(validate.error);
    }   

    next();
}


