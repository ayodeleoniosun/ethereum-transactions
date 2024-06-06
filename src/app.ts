import "dotenv/config";
import 'reflect-metadata';
import express from "express";
import {useContainer as routingUseContainer, useExpressServer} from 'routing-controllers';
import {Container} from 'typedi';
import helmet from "helmet";
import {useContainer as typeormUseContainer} from "typeorm";
import path from "path";
import cors from "cors";
import {ethTransactionScheduler} from './services/cron/eth.subscription';

typeormUseContainer(Container);
routingUseContainer(Container);

export const app = express();

useExpressServer(app, {
    defaultErrorHandler: false,
    routePrefix: '/api',
    cors: true,
    controllers: [path.join(__dirname, '/controllers/*.ts')],
    middlewares: [path.join(__dirname, '/middlewares/*.ts')],
});

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));

ethTransactionScheduler.start();

app.use(express.json());