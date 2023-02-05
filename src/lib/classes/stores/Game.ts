import _ from "lodash"
import { appStore, App } from "./App"
import { web3, utils } from "@project-serum/anchor"
import { writable } from "svelte/store"
import { robberStore, Robots } from "./Robots"
import { debouncer } from "$lib/utils/debounce"

export const MAX_ROBOTS = 25

export class GameStore {
    constructor() {
    }
    private _app: App | undefined
    set app(value: App | undefined) {
        this._app = value
        this.initializeWebapp()
    }

    initializeWebapp = debouncer(function() {
        this.gameRobots(this._app.pubkey).then((robots) => {
            if (!!robots) {
                appStore.update((app: App): App => {
                    app.initialized = true
                    return app
                })
            }
            else {
                appStore.update((app: App): App => {
                    app.initialized = false
                    return app
                })
            }
            this.robots(this._app.pubkey).then((newRobots: Robots) => {
                robberStore.update((robots: Robots): Robots => {
                    robots = newRobots
                    return robots
                })
            })
        })
    })
    startPlaying() {
        this.initialize()
            .then(() => {
                this.initializeWebapp()
            })
            .catch((err) => {
                console.error(err.message)
            })
    }
    stopPlaying() {
        this.delete()
            .then(() => {
                this.initializeWebapp()
            })
            .catch((err) => {
                console.error(err.message)
            })
    }
    async steal(robber: web3.PublicKey, robber_idx: number, victim: web3.PublicKey, victim_idx: number) {
        await this.stealFrom(robber, robber_idx, victim, victim_idx)
    }
    private async initialize(): Promise<void> {
        if (!this._app) {
            return
        }
        await this._app.program?.methods
            .initialize()
            .accounts({
                user: this.signer()._publicKey,
                pda: await this.pda(this.signer()._publicKey),
            })
            .rpc()
        appStore.update((app: App): App => {
            app.initialized = true
            return app
        })
}
    private async delete(): Promise<void> {
        if (!this._app) {
            return
        }
        await this._app.program?.methods
            .delete()
            .accounts({
                receiver: this.signer()._publicKey,
                pda: await this.pda(this.signer()._publicKey),
            })
            .rpc()
        appStore.update((app: App): App => {
            app.initialized = false
            return app
        })
    }
    private async stealFrom(robber: web3.PublicKey, robber_idx: number, victim: web3.PublicKey, victim_idx: number): Promise<void> {
        if (!this._app) {
            return
        }
        await this._app.program?.methods
            .steal(robber_idx, victim_idx)
            .accounts({
                robber: robber,
                robberPda: await this.pda(robber),
                victim: victim,
                victimPda: await this.pda(victim),
            })
            .rpc()
    }
    async robots(pubkey: web3.PublicKey): Promise<Robots> {
        return new Robots(await this.gameRobots(pubkey))
    }
    async gameRobots(pubkey: web3.PublicKey): Promise<GameRobot[] | undefined> {
        let out
        const pda = await this.pda(pubkey)
        try {
            const game = (await this._app?.program?.account.game.fetch(pda, { commtiment: 'confirmed'}) as Game | undefined)
            out = game?.robots || out
        }
        catch (err) {
            console.error(err.message)
        }
        return out
    }
    async pda(pubkey: web3.PublicKey): Promise<web3.PublicKey | undefined> {
        let out
        if (this._app && pubkey) {
            const [pda, _] = web3.PublicKey
            .findProgramAddressSync([
                    utils.bytes.utf8.encode('RoboSwap'),
                    pubkey.toBuffer()
                ],
                this._app.programId
            )
            out = pda
        }
        return out
    }
    signer(): any {
        return this._app?.provider?.wallet
    }
}

export const gameStore = writable(new GameStore())

export const getRandomRobots = (): GameRobot[] => {
    const wallet = web3.Keypair.generate().publicKey
    return _.range(0, MAX_ROBOTS + 1).map((d: number) => ({
        wallet,
        owner: wallet,
        idx: d,
        stolen: 0
    }))
}

interface Game {
    robots: GameRobot[],
    bump: number,
}
export interface GameRobot {
    wallet: web3.PublicKey,
    owner: web3.PublicKey,
    idx: number,
    stolen: number,
}

