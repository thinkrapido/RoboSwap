<script>
    import WalletWidget from "$lib/widgets/wallet/WalletWidget.svelte";
	import ExternalLink from "../navi/ExternalLink.svelte";

</script>

<div class="flex">
    <h1 class="text-9xl font-bold underline text-purple-500 text-shadow-header">
        RoboSwap
    </h1>
    <ExternalLink href="https://robohash.org/">powered by RoboHash</ExternalLink>
    <div class="grow"></div>
    <WalletWidget />    
</div>
