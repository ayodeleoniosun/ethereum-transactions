import config from "./config";
import {blockchainTransactions, server} from './sockets';
import {connectToDatabase} from "./database/connection";

const {port} = config;

blockchainTransactions.initializeSocket().then(data => {
    console.log(data);
}).catch(error => {
    console.log(`Error occurred while streaming blockchain transactions => ${error.message}`);
});

server.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectToDatabase();
});