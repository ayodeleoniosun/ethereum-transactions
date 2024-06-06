export class EthTransactionDto {
    sender: string;
    receiver: string;
    blockNumber: string;
    blockHash: string;
    hash: string;
    gasPrice: number;
    value: number;
}