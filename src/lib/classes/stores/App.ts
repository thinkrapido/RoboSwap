
import { debouncer } from "$lib/utils/debounce"
import { writable } from "svelte/store"
import { walletStore, type WalletStore } from "@svelte-on-solana/wallet-adapter-core"
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
    private provider: AnchorProvider | undefined = undefined
    private program: Program | undefined = undefined

    get isConnected(): boolean {
        return !!this._pubkey
    }
    set pubkey(pubkey: web3.PublicKey|undefined) {
        this._pubkey = pubkey
        if (!!pubkey) {
            const conn = new web3.Connection(network, 'processed')
            this.provider = new AnchorProvider(conn, (window as any).solana, { preflightCommitment: 'processed' })
            this.program = new Program(idl as Idl, new web3.PublicKey(idl.metadata.address), this.provider)
        }
    }
    get hash(): string {
        return this._pubkey?.toBase58() || ""
    }
}

export const appStore = writable(new App())

walletStore.subscribe(debouncer(ws => {
    appStore.update((app: App) => {
        app.pubkey = ws?.publicKey
        return app
    })
}))