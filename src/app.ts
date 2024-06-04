import "dotenv/config";
import 'reflect-metadata';
import express from "express";
import {useContainer as routingUseContainer, useExpressServer} from 'routing-controllers';
import {Container} from 'typedi';
import {connectToDatabase} from "./database/connection";
import config from "./config";
import cors from "cors";
import helmet from "helmet";
import {useContainer as typeormUseContainer} from "typeorm";
import path from "path";

typeormUseContainer(Container);
routingUseContainer(Container);

const app = express();

useExpressServer(app, {
    defaultErrorHandler: false,
    controllers: [path.join(__dirname, '/controllers/*.ts')],
    middlewares: [path.join(__dirname, '/middlewares/*.ts')],
});

const {port} = config;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectToDatabase();
});
