<script lang="ts">

    import { Robot } from "$lib/data/Robot"
    import RoboPicWidget from "../picture/RoboPicWidget.svelte";
    import { App, appStore } from "$lib/widgets/app/App"
	import { onMount } from "svelte";
	import { debouncer } from "$lib/utils/debounce";

    let robber: Robot = Robot.from("")
    let victim: Robot = Robot.from("")
    export let hash: string = ""
	export let view: 'robber' | 'victim' = 'robber'

    onMount(debouncer(() => {
        robber = Robot.from("")
        appStore.subscribe((app: App) => {
            if (app.isConnected) {
                robber = Robot.from(app.hash)
            }
            else {
                robber = Robot.from("")
            }
        })
    }))
    $: {
        victim = Robot.from(hash)
    }

    const steal = () => {
        console.log('steal')
    }

</script>
<div class="flow m-4 mx-auto w-[900px]">
    <div class="inline-block p-4 align-top">
        <div class="mx-auto border-b-2 p-3 border-red-200 text-right mb-4">
            <span class:active={view === 'robber'} class="border-t-1 border-x-red-200 border-x-2 border-red-200 border-t-2 rounded-t-xl text-red-200 p-4" on:click={_ => {view = 'robber'}}>robber</span>
        </div>
        <div class="inline-block flex">
            <div class="inline-block p-4">
                <RoboPicWidget robot={robber}/>
            </div>
            <div class="inline-block p-4" class:robber={view === 'robber'}>
                <RoboPicWidget robot={robber}/>
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
                <RoboPicWidget robot={victim}/>
            </div>
            <div class="inline-block p-4">
                <RoboPicWidget robot={victim}/>
            </div>
        </div>
        <div class="text-center mt-4">
            <input class="text-gray-900" bind:value={hash}/>
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