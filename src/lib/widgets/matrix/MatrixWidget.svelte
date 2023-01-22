
<script lang="ts">

    import * as _ from "lodash"
    import { debouncer } from "$lib/utils/debounce"
	import RoboPicWidget from "../picture/RoboPicWidget.svelte";
	import { Wallet, walletStore } from "../wallet/Wallet"
    import { Robot } from "$lib/data/Robot"
    import { onMount } from "svelte"

    let range: Robot[] = []

    onMount(() => {
        walletStore.subscribe(debouncer((wallet: Wallet) => {
            range = Robot.from(wallet.hash).pics()
        }, 500))
    })


</script>

<div class="flex flex-wrap mx-auto w-[800px] my-12">
        {#each range as robot}
            <div class="p-4">
                <RoboPicWidget robot={robot}/>
            </div>
        {/each }
</div>