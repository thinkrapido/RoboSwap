
import bs58 from "bs58"
import _ from "lodash"
import hex from "convert-hex"
import { slice, clamp } from "$lib/utils/math"

export class Robot {
    private data: number[] = new Array(73)
    constructor(wallet: string, owner: string, idx: number, ownerIdx: number, swaps: number) {
        this.data = [
            ...Array.from(bs58.decode(wallet)),
            ...Array.from(bs58.decode(owner)),
            clamp(idx, 0, 25),
            clamp(ownerIdx, 0, 25),
            ...Array.from(new Uint32Array(swaps)),
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

    get wallet(): string {
        return bs58.encode(slice(this.data, 0, 32))
    }
    get owner(): string {
        return bs58.encode(slice(this.data, 32, 32))
    }
    get picHash(): string {
        return this.hash(clamp(this.data[65], 0, 25), slice(this.data, 32, 32))
    }

    private hash(idx: number, arr: number[]): string {
        const newArray = [idx, ..._.take(arr, 15)]
        const hash = hex.bytesToHex(newArray)
        return _.chunk(hash, 4).map((d: string[]) => d.join('')).join(':')
    }
}
