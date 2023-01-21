<script lang="ts">
  import "../app.css"
	import HeaderWidget from "$lib/widgets/header/HeaderWidget.svelte";
	import TabsWidget from "$lib/widgets/tabs/TabsWidget.svelte";
</script>

<div class="container mx-auto">

  <HeaderWidget />

  <TabsWidget />

  <slot />

</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.900);
    color: theme(colors.yellow.300)
  }
</style>
