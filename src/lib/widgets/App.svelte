<script lang="ts">
	import RoboPic from "./RoboPic.svelte"
	import { robberStore, type Robot, RobotStore } from "$lib/classes/stores/Robot";
    import { hash, shorten } from "$lib/utils/hash"
	import { onMount } from "svelte";
	import { debouncer } from "$lib/utils/debounce";
	import { web3 } from "@project-serum/anchor";
    let robot: Robot
    let robotHash: web3.PublicKey = web3.Keypair.generate().publicKey
    onMount(() => {
        robberStore.subscribe(debouncer((robberStore: RobotStore) => {
            robot = robberStore.getRobotOwner()
        }, 500))
    })
</script>

<div class="bg-red-200 h-32 w-32 m-3">
    <RoboPic robot={robot} isOwner={true}/>
    <div class="text-center">
        <div class="text-center">{shorten(hash(robotHash))}</div>
    </div>
    {#if !$robberStore.isConnected}
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
