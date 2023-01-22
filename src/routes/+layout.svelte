<script lang="ts">
  import "../app.css"
	import HeaderWidget from "$lib/widgets/header/HeaderWidget.svelte";
	import TabsWidget from "$lib/widgets/tabs/TabsWidget.svelte";
	import NotificationWidget from "$lib/widgets/message/NotificationWidget.svelte";
</script>

<div class="container mx-auto">

  <HeaderWidget />

  <TabsWidget />

  <NotificationWidget/>

  <slot />

  <div class="text-center mx-auto w-[80%] mt-8 mb-24 p-2 bg-purple-600 text-xl font-bold">
  </div>

</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.900);
    color: theme(colors.yellow.300)
  }
</style>
