/// <reference types="node" />
import { EVMStateManagerInterface, Proof, StorageRange } from "@nomicfoundation/ethereumjs-common";
import { Account, Address } from "@nomicfoundation/ethereumjs-util";
import { JsonRpcClient } from "../../jsonrpc/client";
import { GenesisAccount } from "../node-types";
export declare class ForkStateManager implements EVMStateManagerInterface {
    private readonly _jsonRpcClient;
    private readonly _forkBlockNumber;
    private _state;
    private _initialStateRoot;
    private _stateRoot;
    private _stateRootToState;
    private _originalStorageCache;
    private _stateCheckpoints;
    private _contextBlockNumber;
    private _contextChanged;
    originalStorageCache: {
        get(address: Address, key: Uint8Array): Promise<Uint8Array>;
        clear(): void;
    };
    constructor(_jsonRpcClient: JsonRpcClient, _forkBlockNumber: bigint);
    dumpStorageRange(_address: Address, _startKey: bigint, _limit: number): Promise<StorageRange>;
    getProof(_address: Address, _storageSlots?: Uint8Array[] | undefined): Promise<Proof>;
    shallowCopy(_downlevelCaches?: boolean | undefined): EVMStateManagerInterface;
    initializeGenesisAccounts(genesisAccounts: GenesisAccount[]): Promise<void>;
    copy(): ForkStateManager;
    getAccount(address: Address): Promise<Account>;
    putAccount(address: Address, account: Account): Promise<void>;
    touchAccount(_address: Address): void;
    putContractCode(address: Address, value: Buffer): Promise<void>;
    getContractCode(address: Address): Promise<Uint8Array>;
    getContractStorage(address: Address, key: Uint8Array): Promise<Uint8Array>;
    putContractStorage(address: Address, key: Buffer, value: Buffer): Promise<void>;
    clearContractStorage(address: Address): Promise<void>;
    checkpoint(): Promise<void>;
    commit(): Promise<void>;
    revert(): Promise<void>;
    getStateRoot(): Promise<Uint8Array>;
    setStateRoot(stateRoot: Uint8Array): Promise<void>;
    dumpStorage(_address: Address): Promise<Record<string, string>>;
    hasGenesisState(): Promise<boolean>;
    generateCanonicalGenesis(): Promise<void>;
    generateGenesis(_initState: any): Promise<void>;
    accountIsEmpty(address: Address): Promise<boolean>;
    cleanupTouchedAccounts(): Promise<void>;
    setBlockContext(stateRoot: Uint8Array, blockNumber: bigint, irregularState?: Uint8Array): void;
    restoreForkBlockContext(stateRoot: Uint8Array): void;
    accountExists(_address: Address): never;
    deleteAccount(address: Address): Promise<void>;
    clearOriginalStorageCache(): void;
    getOriginalContractStorage(address: Address, key: Uint8Array): Promise<Uint8Array>;
    private _putAccount;
    private _setStateRoot;
    hasStateRoot(root: Buffer): Promise<boolean>;
    flush(): Promise<void>;
    modifyAccountFields(address: Address, accountFields: any): Promise<void>;
}
//# sourceMappingURL=ForkStateManager.d.ts.map