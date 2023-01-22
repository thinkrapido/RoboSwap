<script lang="ts">

    import _ from "lodash"
	import { Robot } from "$lib/data/Robot"

    export let robot: Robot

</script>

<div class="bg-red-200 h-32 w-32">
    {#if robot}
        <img src="https://robohash.org/{robot?.picHash}.png" alt={robot?.picHash}/>
    {/if}
</div>
