<script lang="ts">
	import noEntry from '$lib/images/no-entry.gif';
	let { form } = $props();
</script>

<h1>Please Login</h1>
{#if form?.fail}
<img src={noEntry} class="w-1/2" alt="No entry" />
<p class="text-center">You are not allowed</p>
{:else}
<form method="POST" class="flex justify-center gap-2 p-4">
	<button
		formaction="?/login"
		class="rounded-xs rounded-tl-4xl rounded-br-sm bg-green-600 p-4 py-2 font-bold text-white"
		>I am allowed</button
	>
	<button
		formaction="?/fail"
		class="rounded-xs rounded-tr-4xl rounded-bl-sm bg-red-600 p-4 py-2 font-bold text-white"
		>I want to steal your data</button
	>
</form>
{/if}
