
<script lang="ts">
	import OwnerWidet from "$lib/widgets/Owner.svelte"
	import StealMatrixWidget from "$lib/widgets/StealMatrix.svelte"
	import { App, appStore } from "$lib/classes/stores/App"
	import { onMount } from "svelte"

	let robberHash = ""
	let victimHash = ""
	let view: 'robber' | 'victim' = 'robber'

	onMount(() => {
		appStore.subscribe((app: App) => {
			if (app.isConnected) {
				robberHash = app.hash
			}
			else {
				robberHash = ""
			}
		})
	})

</script>

<OwnerWidet bind:hash={victimHash} bind:view={view}/>

<div class="mx-auto w-[300px] text-center">SELECT A ROBOT</div>

{#if view == 'robber' }
<StealMatrixWidget bind:hash={robberHash}/>
{:else}
<StealMatrixWidget bind:hash={victimHash}/>
{/if}