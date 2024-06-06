import cron from 'node-cron';
import {blockchainTransactions} from "../../sockets";

export const ethTransactionScheduler = cron.schedule('*/10 * * * * *', async () => {
    await blockchainTransactions.initializeSocket();
});

