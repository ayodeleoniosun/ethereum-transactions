import {Service} from "typedi";
import config from '../config';
import axios from "axios";
import HttpException from "../utils/exceptions/http.exception";
import * as HttpStatus from "http-status";

@Service()
export class EthereumService {
    private url: string = config.ethereum_api;

    async fetchRpc(method: string, params: any[] = []) {
        try {
            const response = await axios.post(this.url, {
                jsonrpc: "2.0",
                method,
                params,
                id: 1
            });

            return response.data.result;
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getLatestBlockNumber() {
        return await this.fetchRpc("eth_blockNumber");
    }

    async getLatestBlockTransactions(blockNumber: string) {
        return await this.fetchRpc("eth_getBlockByNumber", [blockNumber, true]);
    }
}