<script lang="ts">
	interface Props {
		animate?: boolean | null;
		restart?: boolean | null;
		headline: string;
		phonetic: string;
		description: string;
		/** up to 5 are allowed */
		points: { text: string; image?: string }[];
	}

	let { animate = null, restart = null, headline, phonetic, description, points }: Props = $props();
</script>

<section
	class="slide-with-points h-full"
	data-auto-animate-id="list"
	data-auto-animate={animate}
	data-auto-animate-restart={restart}
>
	<header class="opacity-50"><span>/{phonetic}/</span> - {description}</header>
	<h1 class="py-15 text-left">{headline}</h1>
	<!-- TODO: only active image -->
	<div class="relative flex items-center">
		<ul class="flex-col gap-8">
			{#each points.slice(0, 5) as point, index}
				<li
					class={[
						'fragment',
						index >= 4 || index >= points.length - 1 ? 'fade-in' : 'fade-in-then-semi-out',
					]}
					data-fragment-index={index}
				>
					<span class="text-5xl">{point.text}</span>
				</li>

				{#if point.image}
					<li
						class={[
							'fragment image absolute inset-0 flex h-full items-center justify-center',
							index >= 4 || index >= points.length - 1 ? 'fade-in' : 'fade-in-then-out',
						]}
						data-fragment-index={index}
					>
						<img class="object-contain" src={point.image} role="presentation" alt={point.text} />
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</section>

<style>
	h1,
	header,
	ul,
	li {
		text-align: left;
	}
	ul {
		list-style: none;
		margin: 0;
		display: flex;
		width: calc((100vw - var(--spacing) * 40) * 3 / 4);
	}
	.image {
		translate: calc((100vw - var(--spacing) * 40) * 3 / 4) 0;
	}
	.image,
	.image img {
		width: calc((100vw - var(--spacing) * 40) / 4);
		margin: 0;
	}
</style>
