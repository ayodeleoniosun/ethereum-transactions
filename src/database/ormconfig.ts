import {DataSource} from 'typeorm';
import config from "../config";

export const dataSource = new DataSource({
    type: 'mysql',
    name: 'default',
    host: config.database.host,
    port: 3306,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    entities: [`${__dirname}/../entities/*.{ts,js}`],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    migrationsTableName: "migrations",
    synchronize: false,
    logging: true,
});