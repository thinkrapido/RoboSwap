
<script lang="ts">

    import * as _ from "lodash"
	import RoboPicWidget from "../picture/RoboPicWidget.svelte";
    import { Robot } from "$lib/data/Robot"

    let range: Robot[] = Robot.from('5ZLaVaVJdvdqGmvnS4jYgJ7k54Kdev7f1q5LDytjwqJ6').pics()

</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each range as robot}
            <div class="p-4">
                <RoboPicWidget robot={robot}/>
            </div>
        {/each }
</div>