import { clamp } from "$lib/utils/math"
import _ from "lodash"
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes"
import hex from "convert-hex"
import { web3, type Program } from "@project-serum/anchor"


export class RobotStore {
    constructor(private _hash: string|undefined) {}

    private _idx = 1
    get hash(): string {
        return this._hash ?? web3.Keypair.generate().publicKey.toBase58()
    }
    
    get idx(): number {
        return this._idx
    }
    set idx(value: number) {
        this._idx = value
    }

    private get program(): Program | undefined {
        return
    }

    picHash(idx: number): string {
        idx = clamp(idx, 0, 25)
        const newArray = [idx, ..._.take(this.hash)]
        const hash = hex.bytesToHex(newArray)
        return _.chunk(hash, 4).map((d: string[]): string => d.join('')).join(':')
    }
    picHashAccount(): string {
        return this.picHash(0)
    }

    // chain functions
    isAccountAvailable(): boolean {
        return false
    }
    initialize(): boolean {
        return false
    }
    destroy(): boolean {
        return false
    }
    stealFrom(victim: RobotStore, victim_idx: number): boolean {
        return false
    }
    private async gameData(): Promise<Game | undefined> {
        return await this.program?.account.game.fetch(new web3.PublicKey(this.hash)) as Game | undefined
    }
}

interface Game {
    robots: Robot[],
    bump: number,
}
interface Robot {
    wallet: web3.PublicKey,
    owner: web3.PublicKey,
    idx: number,
    owner_idx: number,
    swaps: number,
}

const hashToArray = (hash: string): number[] => {
    return Array.from(bs58.decode(hash))
}