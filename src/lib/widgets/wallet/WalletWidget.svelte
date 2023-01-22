<script lang="ts">
	import RoboPicWidget from "../picture/RoboPicWidget.svelte"
    import { Robot } from "$lib/data/Robot"
    import { shorten } from "$lib/utils/hash"
    const robot: Robot = Robot.from('5ZLaVaVJdvdqGmvnS4jYgJ7k54Kdev7f1q5LDytjwqJ6')
</script>
<div class="bg-red-200 h-32 w-32 m-3">
    <RoboPicWidget robot={robot}/>
    <div class="text-center">
        <div class="inline-block">Connected</div>
        <div class="text-center">{shorten(robot.wallet)}</div>
    </div>
</div>