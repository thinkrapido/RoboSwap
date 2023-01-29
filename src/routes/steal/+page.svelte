
<script lang="ts">
	import Owner from "$lib/widgets/Owner.svelte"
	import Matrix from "$lib/widgets/Matrix.svelte"
	import { App, appStore } from "$lib/classes/stores/App"
	import { onMount } from "svelte"
	import RoboPic from "$lib/widgets/RoboPic.svelte";
	import { Robot } from "$lib/classes/stores/Robot";

	let robberRobots: Robot[] = []
	let victimRobots: Robot[] = Robot.from("").pics()
	let view: 'robber' | 'victim' = 'robber'

	onMount(() => {
		appStore.subscribe((app: App) => {
			if (app.isConnected) {
				robberRobots = Robot.from(app.hash).pics()
			}
			else {
				robberRobots = Robot.from("").pics()
			}
		})
	})

</script>

<Owner hash={victimRobots[0]?.robberHash || ""} bind:view={view}/>

<div class="mx-auto w-[300px] text-center">SELECT A ROBOT</div>

{#if view == 'robber' }
<Matrix range={robberRobots} let:robot={robot}>
	<RoboPic robot={robot}/>
</Matrix>
{:else}
<Matrix range={victimRobots} let:robot={robot}>
	<RoboPic robot={robot}/>
</Matrix>
{/if}