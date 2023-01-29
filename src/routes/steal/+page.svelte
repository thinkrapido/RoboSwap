
<script lang="ts">
	import Owner from "$lib/widgets/Owner.svelte"
	import Matrix from "$lib/widgets/Matrix.svelte"
	import RoboPic from "$lib/widgets/RoboPic.svelte";
    import { robberStore, Robots, victimStore } from "$lib/classes/stores/Robots"
	import { onMount } from "svelte";

	let robber: Robots = new Robots()
	let victim: Robots = new Robots()
	let view: 'robber' | 'victim' = 'robber'
	let robberIdx: number = 1
	let victimIdx: number = 1
    onMount(() => {
        robberStore.subscribe((r: Robots) => {
            robber = new Robots(r.robots())
        })
        victimStore.subscribe((v: Robots) => {
            victim = new Robots(v.robots())
        })
    })

	const selectRobberIndex = (event: any) => {
		robberIdx = event.detail
	}
	const selectVictimIndex = (event: any) => {
		victimIdx = event.detail
	}

</script>

<Owner bind:view={view} bind:robberIdx={robberIdx} bind:victimIdx={victimIdx}/>

<div class="mx-auto w-[300px] text-center">SELECT A ROBOT</div>

{#if view == 'robber' }
<Matrix robots={robber} let:picUrl={picUrl} on:selected={selectRobberIndex}>
	<RoboPic picUrl={picUrl}/>
</Matrix>
{:else}
<Matrix robots={victim} let:picUrl={picUrl} on:selected={selectVictimIndex}>
	<RoboPic picUrl={picUrl}/>
</Matrix>
{/if}