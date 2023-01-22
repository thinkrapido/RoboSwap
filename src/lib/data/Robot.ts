
import bs58 from "bs58"
import _ from "lodash"
import hex from "convert-hex"
import { slice, clamp, getInt32Bytes } from "$lib/utils/math"

export class Robot {
    private data: number[] = new Array(73)
    constructor(private wallet: string, private owner: string, private idx: number, private ownerIdx: number, swaps: number) {
        this.data = [
            ...Array.from(bs58.decode(wallet)),
            ...Array.from(bs58.decode(owner)),
            clamp(idx, 0, 25),
            clamp(ownerIdx, 0, 25),
            ...getInt32Bytes(clamp(swaps, 0, 2**32-1)),
        ]
    }

    static from(wallet: string): Robot {
        return new Robot(
            wallet,
            wallet,
            0,
            0,
            0,
        )
    }
    pics(): Robot[] {
        return _.range(1, 26).map((idx: number) => 
            new Robot(this.wallet, this.wallet, idx, idx, 0)
        )
    }

    get walletHash(): string {
        return bs58.encode(slice(this.data, 0, 32))
    }
    get ownerHash(): string {
        return bs58.encode(slice(this.data, 32, 32))
    }
    get picHash(): string {
        let used = slice(this.data,  0, 32) // wallet
        let owner  = slice(this.data, 32, 32)
        let idx = this.idx
        if (used !== owner) {
            used = owner
            idx = this.ownerIdx
        }
        const newArray = [idx, ..._.take(used)]
        const hash = hex.bytesToHex(newArray)
        return _.chunk(hash, 4).map((d: string[]) => d.join('')).join(':')
    }
}
