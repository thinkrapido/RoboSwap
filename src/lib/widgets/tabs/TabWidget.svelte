
<script lang="ts">
    import { page } from "$app/stores"
    export let href: string = '#'
    export let name: string = '%Tab%'

</script>

<div class="inline-block mx-3">
    <a class:active={$page.url.pathname == href} class="border-t-1 border-x-red-200 border-x-2 border-red-200 border-t-2 rounded-t-xl text-red-200 p-4" {href}>{name}</a>
</div>

<style lang="postcss">
    a.active {
        background: theme(colors.yellow.300);
        color: theme(colors.gray.900);
    }
</style>