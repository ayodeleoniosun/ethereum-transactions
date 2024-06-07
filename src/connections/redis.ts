import {createClient} from 'redis';
import config from "../config";

export let client;

export const connectToRedis = async () => {
    try {
        client = await createClient({
            url: config.redis.endpoint
        });

        client.connect();
        
        console.log('Redis connection successful');

    } catch (error) {
        console.log(`Redis connection error => ${error}`);
    }
}

export const closeRedis = async () => {
    try {
        client.disconnect();
        console.log('Redis disconnection successful');
    } catch (error) {
        console.log(`Redis disconnection error => ${error}`);
    }
}
