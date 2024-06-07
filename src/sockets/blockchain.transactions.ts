import {Service} from "typedi";
import {EthereumService} from "../services/ethereum.service";
import HttpException from "../utils/exceptions/http.exception";
import * as HttpStatus from "http-status";
import {Socket} from "socket.io";
import {EthTransactionDto} from "../dtos/eth.transaction.dto";
import {client} from '../connections/redis';

@Service()
export class BlockchainTransactions {
    public constructor(private io: any, private socket: any, private ethereumService: EthereumService) {

    }

    async initializeSocket() {
        console.log("Initializing socket ...");
        await this.streamTransactions(this.socket);
    }

    async streamTransactions(socket: Socket) {
        try {
            const latestBlockNumber = await this.ethereumService.getLatestBlockNumber();
            const redisKey = `block-number:${latestBlockNumber}`;

            const isFetchedBlockNumber = await client.get(redisKey);

            if (isFetchedBlockNumber) {
                console.log(`${latestBlockNumber} transactions already retrieved`);
                return;
            }

            const blockTransactions = await this.ethereumService.getLatestBlockTransactions(latestBlockNumber);

            console.log(`Streaming transactions for ${latestBlockNumber}`);

            blockTransactions.transactions.forEach((transaction: object) => {
                this.emitTransaction(transaction, socket);
            });

            await client.set(redisKey, 1);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async emitTransaction(transaction: any, socket: Socket) {
        const {from, to, blockNumber, blockHash, hash, gasPrice, value} = transaction;

        const data: EthTransactionDto = {
            sender: from,
            receiver: to,
            blockNumber,
            blockHash,
            hash,
            gasPrice: parseInt(gasPrice, 16),
            value: parseInt(value, 16),
        };

        //console.log(data);

        //emit to "all" events room
        socket.join("all");
        this.io.to("all").emit("transaction", data);

        // Emit events where an address is either the sender or receiver
        socket.join(`address-${from}`);
        this.io.to(`address-${from}`).emit("transaction", data);

        socket.join(`address-${to}`);
        this.io.to(`address-${to}`).emit("transaction", data);

        // Emit events where an address is the sender
        socket.join(`sender-${from}`);
        this.io.to(`sender-${from}`).emit("transaction", data);

        // Emit events where an address is the receiver
        socket.join(`receiver-${to}`);
        this.io.to(`receiver-${to}`).emit("transaction", data);

        // Emit events in value ranges
        const ethValue = value / 1e18;

        if (ethValue <= 100) {
            socket.join("range-0-100");
            this.io.to("range-0-100").emit("transaction", data);
        } else if (ethValue <= 500) {
            socket.join("range-100-500");
            this.io.to("range-100-500").emit("transaction", data);
        } else if (ethValue <= 2000) {
            socket.join("range-500-2000");
            this.io.to("range-500-2000").emit("transaction", data);
        } else if (ethValue <= 5000) {
            socket.join("range-2000-5000");
            this.io.to("range-2000-5000").emit("transaction", data);
        } else {
            socket.join("range-5000");
            this.io.to("range-5000").emit("transaction", data);
        }
    }
}