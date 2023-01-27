
<script lang="ts">

    import * as _ from "lodash"
    import { debouncer } from "$lib/utils/debounce"
	import RoboPicWidget from "./RoboPic.svelte";
	import { App, appStore } from "$lib/classes/stores/App"
    import { Robot } from "$lib/classes/Robot"
    import { onMount } from "svelte"

    let range: Robot[] = []
    export let hash: string = ""

    $: {
        range = Robot.from(hash).pics()
    }


</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each range as robot}
            <div class="p-4">
                <RoboPicWidget robot={robot}/>
            </div>
        {/each }
</div>