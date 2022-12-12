import { Request, Response, NextFunction } from 'express';

export async function errorHandlingMiddleware(error:any, req:Request, res:Response, next:NextFunction) {

	if (error.type === "conflict") return res.status(error.statusCode).send(error.message);
    if (error.type === "not_found") return res.status(error.statusCode).send(error.message);
	if (error.type === "forbidden") return res.status(error.statusCode).send(error.message);

	return res.sendStatus(500);
}