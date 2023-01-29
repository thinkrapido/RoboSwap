<script lang="ts">
	import RoboPic from "./RoboPic.svelte"
    import { appStore } from "$lib/classes/stores/App";
	import { robberStore, Robots } from "$lib/classes/stores/Robots";
    import { hash, shorten } from "$lib/utils/hash"
	import { onMount } from "svelte";
	import { debouncer } from "$lib/utils/debounce";
	import { web3 } from "@project-serum/anchor";
    let robots: Robots = new Robots()
    onMount(() => {
        robberStore.subscribe(debouncer((robberStore: Robots) => {
            robots = robberStore
        }, 500))
    })
</script>

<div class="bg-red-200 h-32 w-32 m-3">
    <RoboPic picUrl={robots.picUrl0()}/>
    <div class="text-center">
        <div class="text-center">{shorten(robots.hash0())}</div>
    </div>
    {#if !$appStore.isConnected}
        <div class="overlay">
            <div class="inner">
                connect wallet
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .6);
        display: table;
        width: 100%;
        height: 100%;
    }
    .overlay .inner {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .overlay .inner:hover {
        color: white;
    }
</style>
