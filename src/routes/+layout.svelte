<script lang="ts">
  import "../app.css"
	import Header from "$lib/widgets/Header.svelte";
	import Tabs from "$lib/widgets/Tabs.svelte";
	import Notification from "$lib/widgets/Notification.svelte";
</script>

<div class="container mx-auto">

  <Header />

  <Tabs />

  <p class="text-red-300 border-yellow-400 border-2 my-4 mx-[10%] p-4 text-center text-yellow-200 bg-emerald-600">Your Wallet must be on <em>devnet</em>. If you don't know the address of another player use your own.</p>

  <Notification/>

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
