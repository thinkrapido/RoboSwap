
<script lang="ts">
	import { Robot } from "$lib/classes/Robot";
	import { App, appStore } from "$lib/classes/stores/App";
	import { debouncer } from "$lib/utils/debounce";
	import Matrix from "$lib/widgets/Matrix.svelte";
	import RoboPic from "$lib/widgets/RoboPic.svelte";
	import { onMount } from "svelte";

	let range: Robot[] = []

    onMount(() => {
        appStore.subscribe(debouncer((app: App) => {
            range = Robot.from(app.hash).pics()
        }, 500))
    })


</script>


<Matrix range={range} let:robot={robot}>
	<RoboPic robot={robot}/>
</Matrix>