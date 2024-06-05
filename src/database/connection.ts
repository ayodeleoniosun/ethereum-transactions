import {dataSource} from "./ormconfig";

export const connectToDatabase = async () => {
    try {
        const conn = await dataSource.initialize();
        console.log(`Database connection successful => ${conn.options.database}`);
    } catch (error) {
        console.log(`Database connection error => ${error}`);
    }

    return null;
}