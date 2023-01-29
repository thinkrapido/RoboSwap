
<script lang="ts">
	import type { GameRobot } from "$lib/classes/stores/Game";
	import { robberStore, Robots } from "$lib/classes/stores/Robots";
	import { debouncer } from "$lib/utils/debounce";
	import Matrix from "$lib/widgets/Matrix.svelte";
	import RoboPic from "$lib/widgets/RoboPic.svelte";
	import { onMount } from "svelte";

	let robots: Robots = new Robots()

    onMount(() => {
        robberStore.subscribe(debouncer((robberStore: Robots) => {
            robots = robberStore
        }, 500))
    })


</script>


<Matrix robots={robots} let:picUrl={picUrl}>
	<RoboPic picUrl={picUrl}/>
</Matrix>