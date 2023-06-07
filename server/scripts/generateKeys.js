const secp = require("ethereum-cryptography/secp256k1");
const { getPublicAddress, signMessage, recoverKey } = require("../utils/utils")
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log('Private Key: ', toHex(privateKey))
console.log('Public Key (Ethereum Style): ', getPublicAddress(secp.getPublicKey(privateKey)))

let signature, recoveryBit;

signMessage(privateKey).then(s => {
    signature = s[0];
    recoveryBit = s[1];

    console.log('Signature: ', toHex(signature))

    const recovered = recoverKey(signature, recoveryBit)
    console.log("Recovered Public Key from Signature: ", getPublicAddress(recovered))
});




