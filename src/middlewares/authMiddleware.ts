import { Request, Response, NextFunction } from 'express';

import {signUpSchema, loginSchema} from "../schemas/authSchema";

export async function loginMiddleware(req:Request, res:Response, next:NextFunction) {
    
    const validate = loginSchema.validate(req.body);

    if (validate.error) {
        return res.status(422).send(validate.error);
    }   

    next();
}

export async function signUpMiddleware(req:Request, res:Response, next:NextFunction) {
    
    const validate = signUpSchema.validate(req.body);

    if (validate.error) {
        return res.status(422).send(validate.error);
    }   

    next();
}
