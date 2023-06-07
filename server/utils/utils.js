const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const PUBLIC_MESSAGE = "Alchemy University Rocks"


function getPublicAddress(publicKey) {
    const hash = keccak256(publicKey.slice(1))
    return `0x${toHex(hash.slice(-20))}`
}


function hashMessage(message) {
    const bytes = utf8ToBytes(message)
    const hash = keccak256(bytes)

    return hash
}


function signMessage(privateKey) {
    const hashed = hashMessage(PUBLIC_MESSAGE)
    return secp.sign(hashed, privateKey)
}


function recoverKey(signature) {
    try {
        return secp.recoverPublicKey(hashMessage(PUBLIC_MESSAGE), signature, 0)
    }
    catch (error) {
        console.error("recoverKey failed")
        return undefined
    }
}

module.exports = { getPublicAddress, signMessage, hashMessage, recoverKey }