<script lang="ts">
	interface Props {
		id?: string | null;
		animate?: boolean | null;
		restart?: boolean | null;
		headline: string;
		phonetic: string;
		description: string;
		lineNumbers?: string;
		language?: 'html' | 'js' | 'json' | 'svelte' | 'ts';
		children: import('svelte').Snippet;
	}

	let {
		id = null,
		animate = null,
		restart = null,
		children,
		headline,
		phonetic,
		description,
		lineNumbers = '',
		language = 'svelte',
	}: Props = $props();
</script>

<section data-auto-animate-id={id} data-auto-animate={animate} data-auto-animate-restart={restart}>
	<header class="text-3xl opacity-50"><span>/{phonetic}/</span> - {description}</header>
	<h1 class="py-15 text-left">{headline}</h1>
	<pre><code data-trim data-noescape data-line-numbers={lineNumbers} class={`language-${language} ${language}`}>{@render children()}</code
		></pre>
</section>

<style>
	h1,
	header
	 {
		text-align: left;
		max-width: calc((100vw - var(--spacing) * 40));
	}
	pre {
		width: calc((100vw - var(--spacing) * 40));
		margin: 0;
	}
</style>
