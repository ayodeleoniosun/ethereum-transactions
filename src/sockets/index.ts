import {createServer} from "http";
import {Server} from "socket.io";
import {app} from '../app';
import {instrument} from "@socket.io/admin-ui";
import {EthereumService} from "../services/ethereum.service";
import {BlockchainTransactions} from "./blockchain.transactions";

const server = createServer(app);
const socketIo = new Server(server, {
    cors: {
        origin: ['http://localhost:63342', 'https://admin.socket.io'],
        credentials: true,
    }
});

const adminIo = socketIo.of('/admin');

socketIo.on('connection', (socket) => {
    adminIo.on('connection', () => {
        console.log(socket.id + ' connected to admin namespace with username');
    });

    console.log(socket.id + ' connected');
});

const ethereumService = new EthereumService();
const blockchainTransactions = new BlockchainTransactions(socketIo, ethereumService);

instrument(socketIo, {
    auth: false
});

export {
    socketIo, server, blockchainTransactions
}
