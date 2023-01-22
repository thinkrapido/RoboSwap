<script lang="ts">

    import _ from "lodash"
	import { Robot } from "$lib/data/Robot"
    import { clamp } from "$lib/utils/math"

    export let robot: Robot = Robot.from('5ZLaVaVJdvdqGmvnS4jYgJ7k54Kdev7f1q5LDytjwqJ6')

</script>

<div class="bg-red-200 h-32 w-32">
    <img src="https://robohash.org/{robot.picHash}.png" />
</div>
