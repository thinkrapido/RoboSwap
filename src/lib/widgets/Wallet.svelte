<script lang="ts">
    import { network } from "$lib/classes/stores/App";

    import {
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

    const localStorageKey = 'walletAdapter';
	const wallets = [new PhantomWalletAdapter()];
</script>

<div class="inline-block">
    <WalletProvider {localStorageKey} {wallets} autoConnect />
    <ConnectionProvider {network} />
    <WalletMultiButton />
</div>
