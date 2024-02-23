import { AccessListEIP2930TxData, FeeMarketEIP1559TxData, LegacyTxData } from "@nomicfoundation/ethereumjs-tx";
import { Address } from "@nomicfoundation/ethereumjs-util";
export declare function makeFakeSignature(tx: LegacyTxData | AccessListEIP2930TxData | FeeMarketEIP1559TxData, sender: Address): {
    r: number;
    s: number;
};
//# sourceMappingURL=makeFakeSignature.d.ts.map