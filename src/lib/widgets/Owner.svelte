<script lang="ts">

    import { robberStore, Robots, victimStore } from "$lib/classes/stores/Robots"
    import RoboPic from "./RoboPic.svelte";
    import { shorten } from "$lib/utils/hash"
	import { onMount } from "svelte";

    let robber: Robots = new Robots()
    let victim: Robots = new Robots()
    let victimHash: string = ""
	export let view: 'robber' | 'victim' = 'robber'
    export let robberIdx: number = 1
    export let victimIdx: number = 1

    const steal = () => {
        console.log('steal')
    }
    onMount(() => {
        robberStore.subscribe((r: Robots) => {
            robber = new Robots(r.robots())
        })
        victimStore.subscribe((v: Robots) => {
            victim = new Robots(v.robots())
        })
    })

</script>
<div class="flow m-4 mx-auto w-[900px]">
    <div class="inline-block p-4 align-top">
        <div class="mx-auto border-b-2 p-3 border-red-200 text-right mb-4">
            <span class:active={view === 'robber'} class="border-t-1 border-x-red-200 border-x-2 border-red-200 border-t-2 rounded-t-xl text-red-200 p-4" on:click={_ => {view = 'robber'}}>robber</span>
        </div>
        <div class="inline-block flex">
            <div class="inline-block p-4">
                <RoboPic picUrl={robber.picUrl0()}/>
            </div>
            <div class="inline-block p-4" class:robber={view === 'robber'}>
                <RoboPic picUrl={robber.picUrl(robberIdx)}/>
            </div>
        </div>
    </div>
    <div class="steal mt-24 p-4 inline-table w-[100px] py-6 align-top" on:click={steal}>
        <span class="table-cell text-center">
            STEAL
            <img class="steal" src="/images/steal-arrow.svg" alt="STEAL"/>
        </span>
    </div>
    <div class="inline-block p-4">
        <div class="mx-auto border-b-2 p-3 border-red-200 mb-4">
            <span class:active={view === 'victim'} class="border-t-1 border-x-red-200 border-x-2 border-red-200 border-t-2 rounded-t-xl text-red-200 p-4" on:click={_ => {view = 'victim'}}>victim</span>
        </div>
        <div class="inline-block flex">
            <div class="inline-block p-4" class:victim={view === 'victim'}>
                <RoboPic picUrl={victim.picUrl(victimIdx)}/>
            </div>
            <div class="inline-block p-4">
                <RoboPic picUrl={victim.picUrl0()}/>
            </div>
        </div>
        <div class="text-center mt-4">
            <input class="text-gray-900 text-center" value={victimHash ? "" : shorten(victimHash)}/>
        </div>
    </div>
</div>

<style lang="postcss">
    .robber, .victim {
        background-color: theme(colors.purple.500);
    }
    .active {
        background: theme(colors.yellow.300);
        color: theme(colors.gray.900);
    }
    .steal {
        stroke: theme(colors.yellow.300);
    }
    div.steal {
        cursor: pointer;
    }
    div.steal:hover {
        border: 1px solid theme(colors.yellow.300);
        border-radius: theme(borderRadius.lg)
    }
</style>