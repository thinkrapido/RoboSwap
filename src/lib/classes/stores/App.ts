
import { debouncer } from "$lib/utils/debounce"
import { writable, get } from "svelte/store"
import { walletStore, type WalletStore } from "@svelte-on-solana/wallet-adapter-core"
import { AnchorProvider, Program, type Idl, web3 } from "@project-serum/anchor"
import idl from "../../../../../RoboSwapProgram/target/idl/robo_swap_program.json"
import { robberStore } from "./Robots"
import { gameStore } from "./Game"

export const network = 'http://localhost:8899' // web3.clusterApiUrl('devnet');

export class App {
    constructor() {
        walletStore.subscribe(debouncer((value?: WalletStore | undefined) => {
            this.pubkey = value?.publicKey || undefined
        }, 1))
    }

    private _pubkey: web3.PublicKey | undefined = undefined
    private _provider: AnchorProvider | undefined = undefined
    private _program: Program | undefined = undefined

    set pubkey(pubkey: web3.PublicKey | undefined) {
        this._pubkey = pubkey
        if (!!pubkey) {
            const conn = new web3.Connection(network, 'processed')
            this._provider = new AnchorProvider(conn, (window as any).solana, { preflightCommitment: 'processed' })
            this._program = new Program(idl as Idl, this.programId, this._provider)
            appStore.update((app: App): App => {
                app.initialized = true
                return app
            })
        }
        else {
            this._provider = undefined
            this._program = undefined
            appStore.update((app: App): App => {
                app.initialized = false
                return app
            })
        }
    }
    get pubkey(): web3.PublicKey | undefined {
        return this._pubkey
    }
    get program(): Program | undefined {
        return this._program
    }
    get provider(): AnchorProvider | undefined {
        return this._provider
    }
    get programId(): web3.PublicKey {
        return new web3.PublicKey(idl.metadata.address)
    }
    get isConnected(): boolean {
        return !!this.pubkey
    }
    private _isInitialized = false
    get isInitialized(): boolean {
        return this._isInitialized
    }
    set initialized(value: boolean) {
        if (value && this.isConnected) {
            const gs = get(gameStore)
            gs.app = this
            gs.robots(this.pubkey).then((robots) => {
                robberStore.set(robots)
            })
            this._isInitialized = true
        }
        else {
            this._isInitialized = false
        }
    }
}

export const appStore = writable(new App())

walletStore.subscribe(debouncer(ws => {
    appStore.update((app: App) => {
        app.pubkey = ws?.publicKey
        return app
    })
}))