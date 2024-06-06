import {Service} from "typedi";
import {EthereumService} from "../services/ethereum.service";
import HttpException from "../utils/exceptions/http.exception";
import * as HttpStatus from "http-status";
import {io} from './index';
import {Socket} from "socket.io";

@Service()
export class BlockchainTransactions {
    public constructor(private io: io, private ethereumService: EthereumService) {

    }

    async initializeSocket() {
        this.io.on('connection', (socket: Socket) => {
            this.streamTransactions(socket);
        });
    }

    async streamTransactions(socket: Socket) {
        try {
            const latestBlockNumber = await this.ethereumService.getLatestBlockNumber();
            const blockTransactions = await this.ethereumService.getLatestBlockTransactions(latestBlockNumber);

            blockTransactions.transactions.forEach((transaction: object) => {
                this.emitTransaction(transaction, socket);
            });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async emitTransaction(transaction: object, socket: Socket) {
        const {from, to, blockNumber, blockHash, hash, gasPrice, value} = transaction;

        const data = {
            sender: from,
            receiver: to,
            blockNumber,
            blockHash: blockHash,
            txHash: hash,
            gasPrice: parseInt(gasPrice, 16),
            value: parseInt(value, 16),
        };

        //emit to "all" events room
        socket.join("all");

        this.io.to("all").emit("transaction", data);

        // Emit events where an address is either the sender or receiver
        this.io.to(`address-${from}`).emit("transaction", data);
        this.io.to(`address-${to}`).emit("transaction", data);

        // Emit events where an address is the sender
        this.io.to(`sender-${from}`).emit("transaction", data);

        // Emit events where an address is the receiver
        this.io.to(`receiver-${to}`).emit("transaction", data);

        // Emit events in value ranges
        const ethValue = value / 1e18;

        if (ethValue <= 100) {
            this.io.to("range-0-100").emit("transaction", data);
        } else if (ethValue <= 500) {
            this.io.to("range-100-500").emit("transaction", data);
        } else if (ethValue <= 2000) {
            this.io.to("range-500-2000").emit("transaction", data);
        } else if (ethValue <= 5000) {
            this.io.to("range-2000-5000").emit("transaction", data);
        } else {
            this.io.to("range-5000").emit("transaction", data);
        }
    }
}