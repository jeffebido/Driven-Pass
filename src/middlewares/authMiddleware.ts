import { Request, Response, NextFunction } from 'express';

import {signUpSchema, loginSchema} from "../schemas/authSchema";
import {getUserById} from '../services/userService';

import jwt from 'jsonwebtoken';

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

export async function checkAuthenticatedUserMiddleware(req:Request, res:Response, next:NextFunction) {

    const authorization = req.headers['authorization'];
    if (!authorization) return res.sendStatus(401);
  
    const token = authorization.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
  
    try {

        const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

        const  { userId } = jwt.verify(token, SECRET) as { userId: number };

        const user = await getUserById(userId);

        res.locals.userId = user.id;

        next();
    } catch {
        return res.sendStatus(401);
    }
}
