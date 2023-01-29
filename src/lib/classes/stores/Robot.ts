
import _ from "lodash"
import { writable } from "svelte/store"
import { web3 } from "@project-serum/anchor"
import * as anchor from "@project-serum/anchor"
import { clamp } from "$lib/utils/math"
import { App, appStore } from "./App"
import { debouncer } from "$lib/utils/debounce"

const MAX_ROBOTS = 25

export class RobotStore {
    constructor() {
        this._robots = getRandomRobots()
        debouncer(() => {
            appStore.subscribe((app: App) => {
                this._app = app
            })
        })
    }

    private _app: App | undefined
    private _pubkey: web3.PublicKey | undefined
    private _robots: Robot[] = []
    private _idx: number = 0
    private _isInitialized = false
    get isInitalized(): boolean {
        return this._isInitialized
    }
    set idx(idx: number) {
        this._idx = clamp(idx, 0, MAX_ROBOTS)
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
        this._robots = !!pubkey ? await this.getRobots(pubkey) : getRandomRobots()
    }
    get robots(): Robot[] {
        return this._robots
    }
    getRobotOwner(): Robot {
        return this.robots[0]
    }
    getRobot(idx: number): Robot {
        return this.robots[clamp(idx, 0, MAX_ROBOTS)]
    }

    private async getRobots (pubkey: web3.PublicKey | undefined): Promise<Robot[]> {
        if (!this._app || !pubkey) {
            this._isInitialized = false
            return getRandomRobots()
        }
    
        const [pda, _] = web3.PublicKey
            .findProgramAddressSync([
                    anchor.utils.bytes.utf8.encode('RoboSwap'),
                    pubkey.toBuffer()
                ],
                this._app.programId
            )
    
            try {
                const game = (await this._app.program?.account.game.fetch(pda) as Game | undefined)
                this._isInitialized = true
                return game?.robots || getRandomRobots()
            }
            catch {
                this._isInitialized = true
                return getRandomRobots()
            }
    }
}

const getRandomRobots = (): Robot[] => {
    const wallet = web3.Keypair.generate().publicKey
    return _.range(0, MAX_ROBOTS + 1).map((d: number) => ({
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