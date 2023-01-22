
import * as web3 from "@solana/web3.js"

import { debouncer } from "$lib/utils/debounce"
import { writable } from "svelte/store"
import { walletStore as ws, type WalletStore } from "@svelte-on-solana/wallet-adapter-core"
import { update } from "lodash"

export class Wallet {
    constructor() {
        ws.subscribe(debouncer((value?: WalletStore | undefined) => {
            this._pubkey = value?.publicKey || web3.Keypair.generate().publicKey
            this.isConnected = value?.publicKey ? true : false
        }, 1))
    }
    isConnected: boolean = false

    private _pubkey: web3.PublicKey | null = null

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
        this.isConnected = this._pubkey ? true : false
    }
}

export const walletStore = writable(new Wallet())


ws.subscribe(debouncer(ws => {
    walletStore.update((update: Wallet) => {
        update.pubkey(ws?.publicKey)
        return update
    })
}))