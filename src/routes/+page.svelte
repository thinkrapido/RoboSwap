
<script lang="ts">
	import { robberStore, type Robot, RobotStore } from "$lib/classes/stores/Robot";
	import { debouncer } from "$lib/utils/debounce";
	import Matrix from "$lib/widgets/Matrix.svelte";
	import RoboPic from "$lib/widgets/RoboPic.svelte";
	import { onMount } from "svelte";

	let range: Robot[] = []

    onMount(() => {
        robberStore.subscribe(debouncer((robberStore: RobotStore) => {
            range = robberStore.robots
        }, 500))
    })


</script>


<Matrix range={range} let:robot={robot}>
	<RoboPic robot={robot}/>
</Matrix>