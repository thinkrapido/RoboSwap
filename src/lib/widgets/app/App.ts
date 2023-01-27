
import * as web3 from "@solana/web3.js"

import { debouncer } from "$lib/utils/debounce"
import { writable } from "svelte/store"
import { walletStore, type WalletStore } from "@svelte-on-solana/wallet-adapter-core"
import { AnchorProvider, Program } from "@project-serum/anchor"
import idl from "../../../../../RoboSwapProgram/target/idl/robo_swap_program.json"

export const network = 'http://localhost:8899'//clusterApiUrl('devnet'); // localhost or mainnet

export class App {
    constructor() {
        walletStore.subscribe(debouncer((value?: WalletStore | undefined) => {
            this._pubkey = value?.publicKey || null
            this._isConnected = value?.publicKey ? true : false
            this.createProvider()
        }, 1))
    }
    private _isConnected = false
    get isConnected(): boolean {
        return this._isConnected
    }

    private _pubkey: web3.PublicKey | null = null
    private provider: AnchorProvider | null = null
    private program: Program | null = null

    get hash(): string {
        return (this._pubkey ?? web3.Keypair.generate().publicKey).toBase58()
    }

    pubkey(pubkey: string) {
        try {
            this._pubkey = new web3.PublicKey(pubkey)
        }
        catch (err) {
            this._pubkey = null
        }
        this._isConnected = this._pubkey ? true : false
        this.createProvider()
    }
    createProvider(): void {
        if (this._isConnected) {
            const conn = new web3.Connection(network, 'processed')
            this.provider = new AnchorProvider(conn, window.solana, { preflightCommitment: 'processed' })
            this.program = new Program(idl, new web3.PublicKey(idl.metadata.address), this.provider)
        }
    }
}

export const appStore = writable(new App())

walletStore.subscribe(debouncer(ws => {
    appStore.update((update: App) => {
        update.pubkey(ws?.publicKey)
        return update
    })
}))