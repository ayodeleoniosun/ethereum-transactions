import {dataSource} from "./ormconfig";

export const connectToDatabase = async () => {
    try {
        const conn = await dataSource.initialize();
        console.log(`Database connection successful => ${conn.options.database}`);
    } catch (error) {
        console.log(`Database connection error => ${error}`);
    }
}

export const closeDatabase = async () => {
    try {
        await dataSource.destroy();
        console.log('Database connection closed');
    } catch (error) {
        console.log(`Database connection error => ${error}`);
    }
}