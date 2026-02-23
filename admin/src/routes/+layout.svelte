<script lang="ts">
	import './layout.css';
	import { Header } from 'ui';
	import { page } from '$app/state';

	let { children, data } = $props();
	const navItems = [{ path: '/', label: 'Admin' }];
	const pathname = $derived(page.url.pathname)
</script>

<div class="app">
	<Header {navItems} {pathname}>
		{#snippet children()}
			{#if data.session}
				<form action="/auth/login?/logout" method="post">
					<button type="submit" class="p-1 text-2xl">⛓️‍💥</button>
				</form>
			{/if}
		{/snippet}
	</Header>

	<main>{@render children()}</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
