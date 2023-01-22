<script>
	import TabWidget from "./TabWidget.svelte";
</script>

<div class="text-center">
    <div class="inline-block border-b-2 p-3 border-red-200">
        <TabWidget href="/" name="Owned" />
        <TabWidget href="/swap" name="Swap" />
        <TabWidget href="/random" name="Random" />
        <TabWidget href="/leaderboard" name="Leaderboard" />
    </div>
</div>
