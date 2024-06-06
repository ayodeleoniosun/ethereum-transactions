import dotenv from "dotenv";

dotenv.config();
const config = process.env;

export default {
    app_name: config.APP_NAME,
    port: config.APP_PORT,
    jwt_secret: config.JWT_SECRET,
    database: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        name: config.DB_NAME
    },
    ethereum_api: config.ETHEREUM_API
}