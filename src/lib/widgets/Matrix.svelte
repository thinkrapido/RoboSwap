
<script lang="ts">

    import * as _ from "lodash"
	import { Robots } from "$lib/classes/stores/Robots";

    export let robots: Robots = new Robots()

</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each _.range(1, 26) as idx}
            <div class="p-4">
                <slot picUrl={robots.picUrl(idx)}/>
            </div>
        {/each }
</div>