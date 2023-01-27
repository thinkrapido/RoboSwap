<script lang="ts">
	import Wallet from "./Wallet.svelte";
    import AppWidget from "./App.svelte";
	import ExternalLink from "./ExternalLink.svelte";
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