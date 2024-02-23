import { Common } from "@nomicfoundation/ethereumjs-common";
import { AccessListEIP2930Transaction, AccessListEIP2930TxData, TransactionType, TxOptions, TxValuesArray } from "@nomicfoundation/ethereumjs-tx";
import { Address } from "@nomicfoundation/ethereumjs-util";
/**
 * This class is the EIP-2930 version of FakeSenderTransaction.
 */
export declare class FakeSenderAccessListEIP2930Transaction extends AccessListEIP2930Transaction {
    static fromTxData(_txData: AccessListEIP2930TxData, _opts?: TxOptions): never;
    static fromSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromRlpSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromValuesArray(_values: TxValuesArray[TransactionType.AccessListEIP2930], _opts?: TxOptions): never;
    static fromSenderAndRlpSerializedTx(sender: Address, serialized: Uint8Array, opts?: TxOptions): FakeSenderAccessListEIP2930Transaction;
    static fromSenderAndValuesArray(sender: Address, values: TxValuesArray[TransactionType.AccessListEIP2930], opts?: TxOptions): FakeSenderAccessListEIP2930Transaction;
    readonly common: Common;
    private readonly _sender;
    constructor(sender: Address, data?: AccessListEIP2930TxData, opts?: TxOptions);
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
//# sourceMappingURL=FakeSenderAccessListEIP2930Transaction.d.ts.map