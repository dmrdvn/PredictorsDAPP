import { Common } from "@nomicfoundation/ethereumjs-common";
import { LegacyTransaction, LegacyTxData, TxOptions } from "@nomicfoundation/ethereumjs-tx";
import { Address } from "@nomicfoundation/ethereumjs-util";
/**
 * This class represents a legacy transaction sent by a sender whose private
 * key we don't control.
 *
 * The transaction's signature is never validated, but assumed to be valid.
 *
 * The sender's private key is never recovered from the signature. Instead,
 * the sender's address is received as parameter.
 */
export declare class FakeSenderTransaction extends LegacyTransaction {
    static fromTxData(_txData: LegacyTxData, _opts?: TxOptions): never;
    static fromSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromRlpSerializedTx(_serialized: Uint8Array, _opts?: TxOptions): never;
    static fromValuesArray(_values: Uint8Array[], _opts?: TxOptions): never;
    static fromSenderAndRlpSerializedTx(sender: Address, serialized: Uint8Array, opts?: TxOptions): FakeSenderTransaction;
    static fromSenderAndValuesArray(sender: Address, values: Uint8Array[], opts?: TxOptions): FakeSenderTransaction;
    readonly common: Common;
    private readonly _sender;
    constructor(sender: Address, data?: LegacyTxData, opts?: TxOptions);
    verifySignature(): boolean;
    getSenderAddress(): Address;
    sign(): never;
    getSenderPublicKey(): never;
    getMessageToVerifySignature(): never;
    getMessageToSign(): never;
    validate(stringError?: false): boolean;
    validate(stringError: true): string[];
}
//# sourceMappingURL=FakeSenderTransaction.d.ts.map