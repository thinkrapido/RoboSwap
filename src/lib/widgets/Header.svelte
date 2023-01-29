<script lang="ts">
	import Wallet from "./Wallet.svelte";
    import App from "./App.svelte";
	import ExternalLink from "./ExternalLink.svelte";
    import { appStore, type App as A } from "$lib/classes/stores/App";
    import { gameStore } from "$lib/classes/stores/Game";

    const startPlaying = () => {
        $gameStore.startPlaying()
    }
    const stopPlaying = () => {
        $gameStore.stopPlaying()
    }
</script>

<div class="flex">
    <h1 class="text-9xl font-bold underline text-purple-500 text-shadow-header">
        RoboSwap
    </h1>
    <div class="grow">
    </div>
    <div>
        <div class="outer">
            <div class="inner inline-block">
                <ExternalLink href="https://robohash.org/">powered by RoboHash</ExternalLink>
                <br/>
                <br/>
                <Wallet/>
                {#if $appStore.isConnected}
                    {#if !$appStore.isInitialized}
                        <div class="rounded-sm bg-green-400 m-4 py-3 text-gray-900 hover:bg-green-200" on:click={startPlaying}>Initialize Game</div>
                    {:else}
                        <div class="rounded-sm bg-red-400 m-4 py-3 text-gray-900 hover:bg-red-200" on:click={stopPlaying}>Delete all Data</div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
    <App />    
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