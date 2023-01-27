<script>
    import { network } from "$lib/classes/stores/App";
    import AppWidget from "./App.svelte";
	import ExternalLink from "./ExternalLink.svelte";


    import {
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

    const localStorageKey = 'walletAdapter';
	const wallets = [new PhantomWalletAdapter()];
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
    <AppWidget />    
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