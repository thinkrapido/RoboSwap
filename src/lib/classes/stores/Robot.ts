
import _ from "lodash"
import { appStore } from "./App"
import { writable } from "svelte/store"
import anchor, { web3 } from "@project-serum/anchor"
import { getRobots } from "./Game"
import { clamp } from "$lib/utils/math"

export class RobotStore {
    constructor() {}

    private _pubkey: web3.PublicKey | undefined
    private _robots: Robot[] = []
    private _idx: number = 0
    set idx(idx: number) {
        this._idx = clamp(idx, 0, 25)
    }
    get idx(): number {
        if (!this.isConnected) {
            return 0
        }
        return this._idx
    }
    get isConnected(): boolean {
        return !!this.pubkey
    }
    get pubkey(): web3.PublicKey | undefined {
        return this._pubkey
    }
    async setPubkey(pubkey: web3.PublicKey | undefined) {
        this._pubkey = pubkey
        this._robots = await getRobots(pubkey)
    }
    get robots(): Robot[] {
        return this._robots
    }
}

const getRobots = async (pubkey: web3.PublicKey | undefined): Promise<Robot[]> => {
    if (!pubkey) {
        return []
    }

    const [pda, _] = web3.PublicKey
        .findProgramAddressSync([
                anchor.utils.bytes.utf8.encode('RoboSwap'),
                pubkey.toBuffer()
            ],
            $appStore.programId
        )

    return (await $appStore.program?.account.game.fetch(pda) as Game).robots
}
const getRandomRobots = (): Robot[] => {
    const wallet = web3.Keypair.generate().publicKey
    return _.range(0, 25).map((d: number) => ({
        wallet,
        owner: wallet,
        idx: d,
        swaps: 0
    }))
}

interface Game {
    robots: Robot[],
    bump: number,
}
export interface Robot {
    wallet: web3.PublicKey,
    owner: web3.PublicKey,
    idx: number,
    swaps: number,
}

export const robberStore = writable(new RobotStore())
export const victimStore = writable(new RobotStore())