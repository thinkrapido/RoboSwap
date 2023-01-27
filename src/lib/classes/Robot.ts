
import bs58 from "bs58"
import _ from "lodash"
import hex from "convert-hex"
import { slice, clamp, getInt32Bytes } from "$lib/utils/math"
import { web3 } from "@project-serum/anchor"

export class Robot {
    private data: number[] = new Array(73)
    constructor(private robber: string, private victim: string, private idx: number, private ownerIdx: number, swaps: number) {
        this.data = [
            ...Array.from(bs58.decode(robber)),
            ...Array.from(bs58.decode(victim)),
            clamp(idx, 0, 25),
            clamp(ownerIdx, 0, 25),
            ...getInt32Bytes(clamp(swaps, 0, 2**32-1)),
        ]
    }
    
    static from(wallet: string): Robot {
        let isFake = false
        if (!wallet) {
            wallet = web3.Keypair.generate().publicKey.toBase58()
            isFake = true
        }
        const out = new Robot(
            wallet,
            wallet,
            0,
            0,
            0,
        )
        out._isFake = isFake
        return out
    }
    pics(): Robot[] {
        return _.range(1, 26).map((idx: number) => 
            new Robot(this.robber, this.robber, idx, idx, 0)
        )
    }

    private _isFake: boolean = false
    get isFake(): boolean {
        return this._isFake
    }

    get robberHash(): string {
        return bs58.encode(slice(this.data, 0, 32))
    }
    get victimHash(): string {
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
        return _.chunk(hash, 4).map((d: string[]): string => d.join('')).join(':')
    }
    get picUrl(): string {
        if (this.robber === "") {
            return '/images/no-robot.svg'
        }
        return `https://robohash.org/${this.picHash}.png`
    }
}
