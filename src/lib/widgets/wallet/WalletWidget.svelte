<script lang="ts">
	import RoboPicWidget from "../picture/RoboPicWidget.svelte"
	import { Wallet, walletStore } from "./Wallet";
    import { Robot } from "$lib/data/Robot"
    import { shorten } from "$lib/utils/hash"
	import { onMount } from "svelte";
	import { debouncer } from "$lib/utils/debounce";
    let robot: Robot
    let isConnected: boolean = false
    onMount(() => {
        walletStore.subscribe(debouncer((wallet: Wallet) => {
            isConnected = wallet.isConnected
            robot = Robot.from(wallet.hash)
        }, 500))
    })
</script>

<div class="bg-red-200 h-32 w-32 m-3">
    <RoboPicWidget robot={robot}/>
    <div class="text-center">
        <div class="text-center">{shorten(robot?.walletHash)}</div>
    </div>
    {#if !$walletStore.isConnected}
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
