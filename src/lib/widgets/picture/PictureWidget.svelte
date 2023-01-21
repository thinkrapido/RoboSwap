<script lang="ts">

    import bs58 from "bs58"
    import _ from "lodash"
    import hex from "convert-hex"
    import { clamp } from "$lib/utils/math"

    export let pubkey: string = '5ZLaVaVJdvdqGmvnS4jYgJ7k54Kdev7f1q5LDytjwqJ6'
    export let index: number = 0

    let hash: string = '2a02:8070:c189:220:4dc6:288d:fd8e:9c79'

    $: {
        index = clamp(Math.floor(+index), 0, 25)
    }
    $: {
        let arr: number[] = Array.from(bs58.decode(pubkey))
        arr = [index, ...arr]
        hash = _.take(arr, 16)
        hash = hex.bytesToHex(hash)
        hash = _.chunk(hash, 4).map((d: number[]) => d.join('')).join(':')
    }

</script>

<div class="bg-red-200 h-32 w-32">
    <img src="https://robohash.org/{hash}.png" />
</div>
