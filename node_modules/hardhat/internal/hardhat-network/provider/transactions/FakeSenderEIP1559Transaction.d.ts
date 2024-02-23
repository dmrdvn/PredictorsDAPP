import { FeeMarketEIP1559Transaction, FeeMarketEIP1559TxData, TransactionType, TxOptions, TxValuesArray } from "@nomicfoundation/ethereumjs-tx";
import { Address } from "@nomicfoundation/ethereumjs-util";
/**
 * This class is the EIP-1559 version of FakeSenderTransaction.
 */
export declare class FakeSenderEIP1559Transaction extends FeeMarketEIP1559Transaction {
    static fromTxData(_txData: FeeMarketEIP1559TxData, _opts?: TxOptions): never;
    static fromSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromRlpSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromValuesArray(_values: TxValuesArray[TransactionType.FeeMarketEIP1559], _opts?: TxOptions): never;
    static fromSenderAndRlpSerializedTx(sender: Address, serialized: Uint8Array, opts?: TxOptions): FakeSenderEIP1559Transaction;
    static fromSenderAndValuesArray(sender: Address, values: TxValuesArray[TransactionType.FeeMarketEIP1559], opts?: TxOptions): FakeSenderEIP1559Transaction;
    private readonly _sender;
    constructor(sender: Address, data?: FeeMarketEIP1559TxData, opts?: TxOptions);
    verifySignature(): boolean;
    getSenderAddress(): Address;
    getSenderPublicKey(): never;
    _processSignature(_v: bigint, _r: Uint8Array, _s: Uint8Array): never;
    sign(_privateKey: Uint8Array): never;
    getMessageToSign(): never;
    getMessageToVerifySignature(): never;
    validate(stringError?: false): boolean;
    validate(stringError: true): string[];
}
//# sourceMappingURL=FakeSenderEIP1559Transaction.d.ts.map