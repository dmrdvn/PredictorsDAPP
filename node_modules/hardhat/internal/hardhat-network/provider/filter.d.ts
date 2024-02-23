import { Bloom } from "@nomicfoundation/ethereumjs-vm";
import { RpcLogOutput } from "./output";
export declare const LATEST_BLOCK = -1n;
export declare enum Type {
    LOGS_SUBSCRIPTION = 0,
    PENDING_TRANSACTION_SUBSCRIPTION = 1,
    BLOCK_SUBSCRIPTION = 2
}
export interface FilterCriteria {
    fromBlock: bigint;
    toBlock: bigint;
    addresses: Uint8Array[];
    normalizedTopics: Array<Array<Uint8Array | null> | null>;
}
export interface Filter {
    id: bigint;
    type: Type;
    criteria?: FilterCriteria;
    deadline: Date;
    hashes: string[];
    logs: RpcLogOutput[];
    subscription: boolean;
}
export declare function bloomFilter(bloom: Bloom, addresses: Uint8Array[], normalizedTopics: Array<Array<Uint8Array | null> | null>): boolean;
export declare function filterLogs(logs: RpcLogOutput[], criteria: FilterCriteria): RpcLogOutput[];
export declare function includes(addresses: Uint8Array[], a: Uint8Array): boolean;
export declare function topicMatched(normalizedTopics: Array<Array<Uint8Array | null> | null>, logTopics: string[]): boolean;
//# sourceMappingURL=filter.d.ts.map