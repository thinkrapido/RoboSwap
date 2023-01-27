
<script lang="ts">

    import * as _ from "lodash"
    import type { Robot } from "$lib/classes/Robot"

    export let range: Robot[] = []

</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each range as robot}
            <div class="p-4">
                <slot robot={robot}/>
            </div>
        {/each }
</div>