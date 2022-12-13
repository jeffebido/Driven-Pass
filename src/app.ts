import express, { Express } from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter';
import credentialRouter from './routes/credentialRouter';
import wifiRouter from './routes/wifiRouter';

import {  connectDb, disconnectDB } from "./config/database";

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use(credentialRouter);
app.use(wifiRouter);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}
  
export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;
