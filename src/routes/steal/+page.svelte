
<script lang="ts">
	import Owner from "$lib/widgets/Owner.svelte"
	import Matrix from "$lib/widgets/Matrix.svelte"
	import RoboPic from "$lib/widgets/RoboPic.svelte";
	import { Robots } from "$lib/classes/stores/Robots";

	let robberRobots: Robots = new Robots()
	let victimRobots: Robots = new Robots()
	let view: 'robber' | 'victim' = 'robber'

</script>

<Owner bind:view={view}/>

<div class="mx-auto w-[300px] text-center">SELECT A ROBOT</div>

{#if view == 'robber' }
<Matrix robots={robberRobots} let:picUrl={picUrl}>
	<RoboPic picUrl={picUrl}/>
</Matrix>
{:else}
<Matrix robots={victimRobots} let:picUrl={picUrl}>
	<RoboPic picUrl={picUrl}/>
</Matrix>
{/if}