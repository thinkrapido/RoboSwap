
import { web3 } from "@project-serum/anchor"
import hex from "convert-hex"
import _, { clamp } from "lodash"

export const shorten = (hash: string): string => {
    const left  = _.take(hash, 4).join('')
    const right = _.takeRight(hash, 4).join('')
    return `${left}..${right}`
}

export const hash = (pubkey: web3.PublicKey): string => {
    return pubkey.toBase58()
}

const picHash = (pubkey: web3.PublicKey, idx: number): string => {
    const newArray = [idx, ..._.take(pubkey.toBytes())]
    const hash = hex.bytesToHex(newArray)
    return _.chunk(hash, 4).map((d: string[]): string => d.join('')).join(':')
}
export const picUrl = (pubkey: web3.PublicKey | undefined, idx: number = 0): string => {
    idx = clamp(idx, 0, 25)
    if (!pubkey) {
        return '/images/no-robot.svg'
    }
    return `https://robohash.org/${picHash(pubkey, idx)}.png`
}
