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
                <!-- <div on:click={startPlaying}>Start playing</div> -->

                    {#if !$appStore.isInitialized}
                        <div on:click={startPlaying}>Start playing</div>
                    {:else}
                        <div on:click={stopPlaying}>Stop playing</div>
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