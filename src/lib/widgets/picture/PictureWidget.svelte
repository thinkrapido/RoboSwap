<script lang="ts">

    import bs58 from "bs58"
    import _ from "lodash"
    import hex from "convert-hex"

    export let pubkey: string = '5ZLaVaVJdvdqGmvnS4jYgJ7k54Kdev7f1q5LDytjwqJ6'

    let hash: string = '2a02:8070:c189:220:4dc6:288d:fd8e:9c79'

    $: {
        hash = _.take(bs58.decode(pubkey), 16)
        hash = hex.bytesToHex(hash)
        hash = _.chunk(hash, 4).map((d: number[]) => d.join('')).join(':')
    }

</script>

<div class="bg-red-200 h-32 w-32">
    <img src="https://robohash.org/{hash}.png" />
</div>
