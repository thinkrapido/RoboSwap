
<script lang="ts">

    import * as _ from "lodash"
	import PictureWidget from "../picture/PictureWidget.svelte";

    let range: number[] = _.range(25)

</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each range as idx}
            <div class="p-4">
                <PictureWidget />
            </div>
        {/each }
</div>