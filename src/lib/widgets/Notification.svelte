
<script lang="ts">
	import { debouncer } from "$lib/utils/debounce";
	import { randomQuote, randomQuoteByInterval, type Quote } from "$lib/utils/random-robot-quotes"
	import { onDestroy, onMount } from "svelte"
    import { App, appStore } from "$lib/classes/stores/App"


    export let message: string = 'Your phantom wallet is not connected.'

    let quote: Quote = randomQuote()
    let quoteHandle: NodeJS.Timeout
    onMount(() => {
        quoteHandle = randomQuoteByInterval((q: Quote) => {
            quote = q || {}
        })
        appStore.subscribe(debouncer((app: App) => {
            message = app.isConnected ? '' : 'Your phantom wallet is not connected.'
        }, 200))
    })
    onDestroy(() => {
        clearInterval(quoteHandle)
    })
</script>

{#if message}
<div class="text-center mx-auto w-[80%] mt-8 p-5 bg-purple-600 text-xl font-bold">
    {message}
</div>
{:else}
<div class="mx-auto w-[80%] mt-8 p-5 bg-purple-600 text-center text-xl text-white font-bold">
    <div class="text-sm w-[50%] mx-auto"><em><q class="text-center">{quote.quote}</q></em></div>
    <div class="font-italic text-sm text-yellow-300"><em >{quote.author}</em></div>
</div>
{/if}
