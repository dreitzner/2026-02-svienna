<script lang="ts">
	interface Props {
		id?: string | null;
		animate?: boolean | null;
		restart?: boolean | null;
		children: import('svelte').Snippet;
	}

	let { id = null, animate = null, restart = null, children }: Props = $props();
</script>

<section
	data-auto-animate-id={id}
	data-auto-animate={animate}
	data-auto-animate-restart={restart}
	class="slide-cover h-full"
>
	<div class="h-full flex items-center justify-center">{@render children()}</div>
</section>
<style>
	.slide-cover{
		max-width: calc((100vw - var(--spacing) * 40));
	}
</style>
