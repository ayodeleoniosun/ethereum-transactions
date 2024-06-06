import cron from 'node-cron';
import {blockchainTransactions} from "../../sockets";

export const ethTransactionScheduler = cron.schedule('*/10 * * * * *', async () => {
    console.log("Initiate ethereum transaction streaming ...");
    await blockchainTransactions.initializeSocket();
});

