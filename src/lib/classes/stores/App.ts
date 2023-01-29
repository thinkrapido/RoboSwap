
import { debouncer } from "$lib/utils/debounce"
import { writable } from "svelte/store"
import { walletStore, type WalletStore } from "@svelte-on-solana/wallet-adapter-core"
import { robberStore, RobotStore } from "./Robot"
import { AnchorProvider, Program, type Idl, web3 } from "@project-serum/anchor"
import idl from "../../../../../RoboSwapProgram/target/idl/robo_swap_program.json"

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
        }
        else {
            this._provider = undefined
            this._program = undefined
        }
        robberStore.update((robberStore: RobotStore): RobotStore => {
            robberStore.setPubkey(pubkey)
            return robberStore
        })
    }
    get pubkey(): web3.PublicKey | undefined {
        return this._pubkey
    }
    get program(): Program | undefined {
        return this._program
    }
    get programId(): web3.PublicKey {
        return new web3.PublicKey(idl.metadata.address)
    }
    get isConnected(): boolean {
        return !!this.pubkey
    }
}

export const appStore = writable(new App())

walletStore.subscribe(debouncer(ws => {
    appStore.update((app: App) => {
        app.pubkey = ws?.publicKey
        return app
    })
}))