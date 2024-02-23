"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFakeSignature = void 0;
const hash_1 = require("../../../util/hash");
// Produces a signature with r and s values taken from a hash of the inputs.
function makeFakeSignature(tx, sender) {
    const hashInputString = [
        sender,
        tx.nonce,
        tx.gasLimit,
        tx.value,
        tx.to,
        tx.data,
        "gasPrice" in tx ? tx.gasPrice : "",
        "chainId" in tx ? tx.chainId : "",
        "maxPriorityFeePerGas" in tx ? tx.maxPriorityFeePerGas : "",
        "maxFeePerGas" in tx ? tx.maxFeePerGas : "",
        "accessList" in tx
            ? tx.accessList?.map((accessListItem) => {
                let address;
                let storageKeys;
                if (Array.isArray(accessListItem)) {
                    address = Buffer.from(accessListItem[0]).toString("hex");
                    storageKeys = accessListItem[1].map((b) => Buffer.from(b).toString("hex"));
                }
                else {
                    address = accessListItem.address;
                    storageKeys = accessListItem.storageKeys;
                }
                return [address, ...storageKeys]
                    .map((b) => Buffer.from(b).toString("hex"))
                    .join(";");
            })
            : "",
    ]
        .map((a) => a?.toString() ?? "")
        .join(",");
    const hashDigest = (0, hash_1.createNonCryptographicHashBasedIdentifier)(Buffer.from(hashInputString));
    return {
        r: hashDigest.readUInt32LE(),
        s: hashDigest.readUInt32LE(4),
    };
}
exports.makeFakeSignature = makeFakeSignature;
//# sourceMappingURL=makeFakeSignature.js.map