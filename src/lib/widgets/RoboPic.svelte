<script lang="ts">

    import _ from "lodash"
	import type { Robot } from "$lib/classes/stores/Robot"
	import { picUrl } from "$lib/utils/hash";

    export let robot: Robot
    export let isOwner: boolean = false

</script>

<div class="bg-red-200 h-32 w-32">
    {#if isOwner}
        <img src={picUrl(robot?.wallet)} alt={picUrl(robot?.wallet)}/>
    {:else}
        <img src={picUrl(robot?.owner, robot?.idx)} alt={picUrl(robot?.wallet, robot?.idx)}/>
    {/if}
</div>
