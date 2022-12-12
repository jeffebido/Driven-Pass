import express from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter';
import credentialRouter from './routes/credentialRouter';

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use(credentialRouter);

const PORT = process.env.PORT || '5000';
const HOST = '127.0.0.1';

app.listen({ port: PORT, host: HOST},  () => {
    console.log(`Server is listening on port ${PORT}.`);
});