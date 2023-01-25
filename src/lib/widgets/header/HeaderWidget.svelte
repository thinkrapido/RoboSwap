<script>
    import WalletWidget from "$lib/widgets/wallet/WalletWidget.svelte";
	import ExternalLink from "../navi/ExternalLink.svelte";
    import { Wallet } from "$lib/widgets/wallet/Wallet"


    import {
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = 'http://localhost:8899'//clusterApiUrl('devnet'); // localhost or mainnet

	let wallets = [new PhantomWalletAdapter()];
</script>

<div class="flex">
    <h1 class="text-9xl font-bold underline text-purple-500 text-shadow-header">
        RoboSwap
    </h1>
    <div class="grow">
        <div class="outer">
            <div class="inner inline-block">
                <ExternalLink href="https://robohash.org/">powered by RoboHash</ExternalLink>
                <br/>
                <br/>
                <div class="inline-block">
                    <WalletProvider {localStorageKey} {wallets} autoConnect />
                    <ConnectionProvider {network} />
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    </div>
    <WalletWidget />    
</div>

<style lang="postcss">

    .outer {
        display: table;
        height: 100%;
        width: 100%;
    }
    .inner {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

</style>