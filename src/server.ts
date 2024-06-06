import config from "./config";
import {server} from './sockets';
import {connectToDatabase} from "./database/connection";

const {port} = config;

server.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    console.log('  Press CTRL-C to stop\n');
    await connectToDatabase();
});