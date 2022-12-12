import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function LogIn(req: Request, res: Response) {
    
    const response = await authService.LogIn(req.body);
    
    if(response){
        res.status(200).send( response )
    }else{
        res.send( 401 );
    }
    
}

export async function SignUp(req: Request, res: Response) {
    
    await authService.SignUp(req.body);

    res.send( 201 );
}