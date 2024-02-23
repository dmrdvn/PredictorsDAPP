import { Common } from "@nomicfoundation/ethereumjs-common";
import { HardforkName } from "../../../util/hardforks";
import { HardhatBlockchain } from "../HardhatBlockchain";
import { LocalNodeConfig } from "../node-types";
export declare function putGenesisBlock(blockchain: HardhatBlockchain, common: Common, { initialDate, blockGasLimit: initialBlockGasLimit }: LocalNodeConfig, stateRoot: Uint8Array, hardfork: HardforkName, initialMixHash: Uint8Array, initialParentBeaconBlockRoot: Uint8Array, initialBaseFee?: bigint): Promise<void>;
//# sourceMappingURL=putGenesisBlock.d.ts.map