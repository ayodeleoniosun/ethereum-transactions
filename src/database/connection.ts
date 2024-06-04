import {connectionOptions} from "./ormconfig";

export const connectToDatabase = async () => {
    try {
        const conn = await connectionOptions.initialize();
        console.log(`Database connection successful => ${conn.options.database}`);
    } catch (error) {
        console.log(`Database connection error => ${error}`);
    }

    return null;
}