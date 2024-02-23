/// <reference types="node" />
import { Block } from "@nomicfoundation/ethereumjs-block";
import { BlockchainInterface, BlockchainEvents } from "@nomicfoundation/ethereumjs-blockchain";
import { Common } from "@nomicfoundation/ethereumjs-common";
import { TypedTransaction } from "@nomicfoundation/ethereumjs-tx";
import { AsyncEventEmitter } from "@nomicfoundation/ethereumjs-util";
import { JsonRpcClient } from "../../jsonrpc/client";
import { BlockchainBase } from "../BlockchainBase";
import { FilterParams } from "../node-types";
import { RpcLogOutput, RpcReceiptOutput } from "../output";
import { HardhatBlockchainInterface } from "../types/HardhatBlockchainInterface";
export declare class ForkBlockchain extends BlockchainBase implements HardhatBlockchainInterface {
    private _jsonRpcClient;
    private _forkBlockNumber;
    private _latestBlockNumber;
    events?: AsyncEventEmitter<BlockchainEvents> | undefined;
    constructor(_jsonRpcClient: JsonRpcClient, _forkBlockNumber: bigint, common: Common);
    getIteratorHead(_name?: string | undefined): Promise<Block>;
    setIteratorHead(_tag: string, _headHash: Uint8Array): Promise<void>;
    getCanonicalHeadBlock(): Promise<Block>;
    shallowCopy(): BlockchainInterface;
    getLatestBlockNumber(): bigint;
    getBlock(blockHashOrNumber: Buffer | bigint): Promise<Block>;
    addBlock(block: Block): Promise<Block>;
    reserveBlocks(count: bigint, interval: bigint, previousBlockStateRoot: Buffer, previousBlockTotalDifficulty: bigint, previousBlockBaseFeePerGas: bigint | undefined): void;
    deleteLaterBlocks(block: Block): void;
    getTotalDifficulty(blockHash: Buffer): Promise<bigint>;
    getTransaction(transactionHash: Buffer): Promise<TypedTransaction | undefined>;
    getBlockByTransactionHash(transactionHash: Buffer): Promise<Block | null>;
    getTransactionReceipt(transactionHash: Buffer): Promise<RpcReceiptOutput | null>;
    getForkBlockNumber(): bigint;
    getLogs(filterParams: FilterParams): Promise<RpcLogOutput[]>;
    private _getBlockByHash;
    private _getBlockByNumber;
    private _processRemoteBlock;
    protected _delBlock(blockNumber: bigint): void;
    private _processRemoteTransaction;
    private _processRemoteReceipt;
}
//# sourceMappingURL=ForkBlockchain.d.ts.map