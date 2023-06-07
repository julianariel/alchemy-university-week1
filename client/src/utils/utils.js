import { recoverPublicKey, sign } from "ethereum-cryptography/secp256k1"

import { utf8ToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"

const PUBLIC_MESSAGE = "Alchemy University Rocks"


export function getPublicAddress(publicKey) {
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
    return sign(hashed, privateKey)
}


export function recoverKey(signature) {
    try {
        return recoverPublicKey(hashMessage(PUBLIC_MESSAGE), signature, 0)
    }
    catch (error) {
        console.error("Invalid Signature: ", error)
        return undefined
    }
}

