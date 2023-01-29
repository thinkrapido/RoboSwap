<script lang="ts">
    
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const selected = (idx: any) => {
        dispatch('selected', idx)
    }

    export let picUrl : string = ""
    export let stolen : number | undefined = undefined
    
</script>

<div class="bg-red-200 h-32 w-32">
    <img src={picUrl} alt={picUrl} on:click={selected}/>
</div>
{#if stolen !== undefined}
<div class="text-center py-4 text-[1.4rem] bg-purple-800">
    stolen {stolen}x
</div>
{/if}
