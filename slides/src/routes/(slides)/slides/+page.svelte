<script lang="ts">
	import { onMount } from 'svelte';

	import Reveal from 'reveal.js';
	import Highlight from 'reveal.js/plugin/highlight/highlight';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import Notes from 'reveal.js/plugin/notes/notes';

	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/black.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import SlidePoints from '$lib/component/SlidePoints.svelte';

	import kids from '$lib/assets/kids.png';
	import woom from '$lib/assets/woom.avif';
	import thankYou from '$lib/assets/thank-you.gif';
	import svienna from '$lib/assets/svienna.png';
	import SlideCover from '$lib/component/SlideCover.svelte';
	import SlideCode from '$lib/component/SlideCode.svelte';

	onMount(async () => {
		const deck = new Reveal({
			plugins: [Markdown, Highlight, Notes],
			autoAnimateEasing: 'ease',
			autoAnimateDuration: 1,
			hash: true,
			// controls: false,
			// progress: false,

			center: false,
			disableLayout: true,
		});

		// @ts-ignore
		const svleteHighlight = await import('highlightjs-svelte');
		deck.initialize({
			highlight: {
				beforeHighlight: (hljs) => svleteHighlight.default(hljs),
			},
		});
	});
</script>

<div class="reveal">
	<div class="slides h-screen px-20 py-10 flex">
		<SlideCover>
			<h1 class="fragment">
				One Repo to Rule Them All: SvelteKit + Remote Type Safety
			</h1>
		</SlideCover>
		<SlidePoints
			phonetic="huːs"
			description="whois is a query and response protocol"
			headline="#me"
			points={[
				{ text: 'Husband and father of 4 kids', image: kids },
				{ text: 'From robotics to the web' },
				{ text: 'Web enthusiast @woom', image: woom },
				{ text: 'Musician' },
				{ text: 'Founder of Svelte Society Vienna', image: svienna },
			]}
		/>
		<SlidePoints
			phonetic="hands"
			description="✋✋✋✋✋✋✋"
			headline="Show of hands"
			points={[
				{ text: 'Who has worked with Svelte?' },
				{ text: 'Who uses Typescript?' },
				{ text: 'Who has used a monorepo?' },
				{ text: 'Who has used remote functions?' },
				{ text: 'Who has done all the above in one project?' },
			]}
		/>
		<SlideCode
			phonetic="kənˌfɪɡjʊˈreɪʃn"
			description="an arrangement of parts or elements in a particular form, figure, or combination"
			headline="svelte.config.js"
			language="js"
			>{`import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
};

export default config;`}</SlideCode
		>
		<SlideCode
			phonetic="kənˌfɪɡjʊˈreɪʃn"
			description="an arrangement of parts or elements in a particular form, figure, or combination"
			headline="svelte.config.js"
			lineNumbers="8-12"
			language="js"
			>{`import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;`}</SlideCode>
		<!-- basic remote code -->
		<SlideCode
			phonetic="rɪˈməʊt"
			description="conducted away from a usual workplace or location"
			headline="Basic remote function (*.remote.ts)"
			lineNumbers="3|5-12"
			language="ts"
			>{`import { query, form } from '$app/server';

export const getTodos = query(async () => TODOS);

export const createTodo = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ title }) => {
		// some logic
	}
);
`}</SlideCode>
		<!-- basic component code -->
		<SlideCode
			phonetic="kəmˈpəʊnənt"
			description="a part or element of a larger whole"
			headline="Use data it in a component"
			>{`<ul>
	{#each Object.entries(await getTodos()) as [id, todo] (id)}
		<li>
			// render todo
		</li>
	{/each}
</ul>`}</SlideCode>
		<SlideCode
			phonetic="kəmˈpəʊnənt"
			description="a part or element of a larger whole"
			headline="Use data it in a component"
			>{`<script lang="ts">
	import { getTodos } from './todos.remote';
	const query = getPosts();
</script>
{#if query.error}
	<p>oops!</p>
{:else if query.loading}
	<p>loading...</p>
{:else}
	<ul>
		{#each Object.entries(query.current) as [id, todo] (id)}
			<li>
				// render todo
			</li>
		{/each}
	</ul>
{/if}`}</SlideCode>
		<SlideCode
			phonetic="kəmˈpəʊnənt"
			description="a part or element of a larger whole"
			headline="Use data it in a component"
			>{`<script lang="ts">
	import { getTodos } from './todos.remote';
	const todos = $derived(await getTodos());
</script>
<ul>
	{#each Object.entries(todos) as [id, todo] (id)}
		<li>
			// render todo
		</li>
	{/each}
</ul>`}</SlideCode>
		<SlidePoints
			phonetic="ʌɪˈdɪə"
			description="a thought or suggestion as to a possible course of action"
			headline="some bad ideas 💡?"
			points={[
				{ text: 'Share some of the UI components?' },
				{ text: 'Share data between SvelteKit projects?' },
				{ text: 'Maybe type the shared data?' },
			]}
		/>
		<SlideCover>
			<h1>#examples</h1>
		</SlideCover>
		<SlideCover>
			<div>
				<h1>#done</h1>
				<div class="flex gap-24 justify-center mt-12">
					<img src={thankYou} alt="Thank you" />
				
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="248" height="248">
						<!-- Created with https://api.qrserver.com (QR Code API, see goQR.me/api for information) -->
						<title>QR Code</title>
						<desc>https://reitzner.at/talks/2026-02-svienna</desc>
						<rect style="fill:rgb(255, 255, 255);fill-opacity:1" x="0" y="0" width="248" height="248" />
						<g id="elements">
							<path style="fill:rgb(0, 0, 0)" d="M 8,8 l 8,0 0,8 -8,0 z M 16,8 l 8,0 0,8 -8,0 z M 24,8 l 8,0 0,8 -8,0 z M 32,8 l 8,0 0,8 -8,0 z M 40,8 l 8,0 0,8 -8,0 z M 48,8 l 8,0 0,8 -8,0 z M 56,8 l 8,0 0,8 -8,0 z M 88,8 l 8,0 0,8 -8,0 z M 104,8 l 8,0 0,8 -8,0 z M 112,8 l 8,0 0,8 -8,0 z M 128,8 l 8,0 0,8 -8,0 z M 136,8 l 8,0 0,8 -8,0 z M 144,8 l 8,0 0,8 -8,0 z M 152,8 l 8,0 0,8 -8,0 z M 160,8 l 8,0 0,8 -8,0 z M 168,8 l 8,0 0,8 -8,0 z M 184,8 l 8,0 0,8 -8,0 z M 192,8 l 8,0 0,8 -8,0 z M 200,8 l 8,0 0,8 -8,0 z M 208,8 l 8,0 0,8 -8,0 z M 216,8 l 8,0 0,8 -8,0 z M 224,8 l 8,0 0,8 -8,0 z M 232,8 l 8,0 0,8 -8,0 z M 8,16 l 8,0 0,8 -8,0 z M 56,16 l 8,0 0,8 -8,0 z M 72,16 l 8,0 0,8 -8,0 z M 88,16 l 8,0 0,8 -8,0 z M 120,16 l 8,0 0,8 -8,0 z M 168,16 l 8,0 0,8 -8,0 z M 184,16 l 8,0 0,8 -8,0 z M 232,16 l 8,0 0,8 -8,0 z M 8,24 l 8,0 0,8 -8,0 z M 24,24 l 8,0 0,8 -8,0 z M 32,24 l 8,0 0,8 -8,0 z M 40,24 l 8,0 0,8 -8,0 z M 56,24 l 8,0 0,8 -8,0 z M 104,24 l 8,0 0,8 -8,0 z M 120,24 l 8,0 0,8 -8,0 z M 136,24 l 8,0 0,8 -8,0 z M 152,24 l 8,0 0,8 -8,0 z M 184,24 l 8,0 0,8 -8,0 z M 200,24 l 8,0 0,8 -8,0 z M 208,24 l 8,0 0,8 -8,0 z M 216,24 l 8,0 0,8 -8,0 z M 232,24 l 8,0 0,8 -8,0 z M 8,32 l 8,0 0,8 -8,0 z M 24,32 l 8,0 0,8 -8,0 z M 32,32 l 8,0 0,8 -8,0 z M 40,32 l 8,0 0,8 -8,0 z M 56,32 l 8,0 0,8 -8,0 z M 72,32 l 8,0 0,8 -8,0 z M 80,32 l 8,0 0,8 -8,0 z M 88,32 l 8,0 0,8 -8,0 z M 104,32 l 8,0 0,8 -8,0 z M 112,32 l 8,0 0,8 -8,0 z M 144,32 l 8,0 0,8 -8,0 z M 184,32 l 8,0 0,8 -8,0 z M 200,32 l 8,0 0,8 -8,0 z M 208,32 l 8,0 0,8 -8,0 z M 216,32 l 8,0 0,8 -8,0 z M 232,32 l 8,0 0,8 -8,0 z M 8,40 l 8,0 0,8 -8,0 z M 24,40 l 8,0 0,8 -8,0 z M 32,40 l 8,0 0,8 -8,0 z M 40,40 l 8,0 0,8 -8,0 z M 56,40 l 8,0 0,8 -8,0 z M 80,40 l 8,0 0,8 -8,0 z M 112,40 l 8,0 0,8 -8,0 z M 136,40 l 8,0 0,8 -8,0 z M 144,40 l 8,0 0,8 -8,0 z M 152,40 l 8,0 0,8 -8,0 z M 160,40 l 8,0 0,8 -8,0 z M 168,40 l 8,0 0,8 -8,0 z M 184,40 l 8,0 0,8 -8,0 z M 200,40 l 8,0 0,8 -8,0 z M 208,40 l 8,0 0,8 -8,0 z M 216,40 l 8,0 0,8 -8,0 z M 232,40 l 8,0 0,8 -8,0 z M 8,48 l 8,0 0,8 -8,0 z M 56,48 l 8,0 0,8 -8,0 z M 72,48 l 8,0 0,8 -8,0 z M 80,48 l 8,0 0,8 -8,0 z M 96,48 l 8,0 0,8 -8,0 z M 104,48 l 8,0 0,8 -8,0 z M 120,48 l 8,0 0,8 -8,0 z M 128,48 l 8,0 0,8 -8,0 z M 144,48 l 8,0 0,8 -8,0 z M 152,48 l 8,0 0,8 -8,0 z M 184,48 l 8,0 0,8 -8,0 z M 232,48 l 8,0 0,8 -8,0 z M 8,56 l 8,0 0,8 -8,0 z M 16,56 l 8,0 0,8 -8,0 z M 24,56 l 8,0 0,8 -8,0 z M 32,56 l 8,0 0,8 -8,0 z M 40,56 l 8,0 0,8 -8,0 z M 48,56 l 8,0 0,8 -8,0 z M 56,56 l 8,0 0,8 -8,0 z M 72,56 l 8,0 0,8 -8,0 z M 88,56 l 8,0 0,8 -8,0 z M 104,56 l 8,0 0,8 -8,0 z M 120,56 l 8,0 0,8 -8,0 z M 136,56 l 8,0 0,8 -8,0 z M 152,56 l 8,0 0,8 -8,0 z M 168,56 l 8,0 0,8 -8,0 z M 184,56 l 8,0 0,8 -8,0 z M 192,56 l 8,0 0,8 -8,0 z M 200,56 l 8,0 0,8 -8,0 z M 208,56 l 8,0 0,8 -8,0 z M 216,56 l 8,0 0,8 -8,0 z M 224,56 l 8,0 0,8 -8,0 z M 232,56 l 8,0 0,8 -8,0 z M 80,64 l 8,0 0,8 -8,0 z M 88,64 l 8,0 0,8 -8,0 z M 96,64 l 8,0 0,8 -8,0 z M 112,64 l 8,0 0,8 -8,0 z M 136,64 l 8,0 0,8 -8,0 z M 168,64 l 8,0 0,8 -8,0 z M 8,72 l 8,0 0,8 -8,0 z M 16,72 l 8,0 0,8 -8,0 z M 24,72 l 8,0 0,8 -8,0 z M 32,72 l 8,0 0,8 -8,0 z M 40,72 l 8,0 0,8 -8,0 z M 56,72 l 8,0 0,8 -8,0 z M 64,72 l 8,0 0,8 -8,0 z M 72,72 l 8,0 0,8 -8,0 z M 80,72 l 8,0 0,8 -8,0 z M 96,72 l 8,0 0,8 -8,0 z M 112,72 l 8,0 0,8 -8,0 z M 144,72 l 8,0 0,8 -8,0 z M 168,72 l 8,0 0,8 -8,0 z M 176,72 l 8,0 0,8 -8,0 z M 192,72 l 8,0 0,8 -8,0 z M 208,72 l 8,0 0,8 -8,0 z M 224,72 l 8,0 0,8 -8,0 z M 16,80 l 8,0 0,8 -8,0 z M 32,80 l 8,0 0,8 -8,0 z M 64,80 l 8,0 0,8 -8,0 z M 88,80 l 8,0 0,8 -8,0 z M 104,80 l 8,0 0,8 -8,0 z M 112,80 l 8,0 0,8 -8,0 z M 136,80 l 8,0 0,8 -8,0 z M 160,80 l 8,0 0,8 -8,0 z M 168,80 l 8,0 0,8 -8,0 z M 184,80 l 8,0 0,8 -8,0 z M 192,80 l 8,0 0,8 -8,0 z M 200,80 l 8,0 0,8 -8,0 z M 232,80 l 8,0 0,8 -8,0 z M 24,88 l 8,0 0,8 -8,0 z M 32,88 l 8,0 0,8 -8,0 z M 40,88 l 8,0 0,8 -8,0 z M 48,88 l 8,0 0,8 -8,0 z M 56,88 l 8,0 0,8 -8,0 z M 88,88 l 8,0 0,8 -8,0 z M 120,88 l 8,0 0,8 -8,0 z M 144,88 l 8,0 0,8 -8,0 z M 152,88 l 8,0 0,8 -8,0 z M 168,88 l 8,0 0,8 -8,0 z M 176,88 l 8,0 0,8 -8,0 z M 184,88 l 8,0 0,8 -8,0 z M 200,88 l 8,0 0,8 -8,0 z M 8,96 l 8,0 0,8 -8,0 z M 24,96 l 8,0 0,8 -8,0 z M 48,96 l 8,0 0,8 -8,0 z M 72,96 l 8,0 0,8 -8,0 z M 104,96 l 8,0 0,8 -8,0 z M 112,96 l 8,0 0,8 -8,0 z M 120,96 l 8,0 0,8 -8,0 z M 128,96 l 8,0 0,8 -8,0 z M 160,96 l 8,0 0,8 -8,0 z M 168,96 l 8,0 0,8 -8,0 z M 176,96 l 8,0 0,8 -8,0 z M 184,96 l 8,0 0,8 -8,0 z M 192,96 l 8,0 0,8 -8,0 z M 200,96 l 8,0 0,8 -8,0 z M 208,96 l 8,0 0,8 -8,0 z M 224,96 l 8,0 0,8 -8,0 z M 8,104 l 8,0 0,8 -8,0 z M 24,104 l 8,0 0,8 -8,0 z M 32,104 l 8,0 0,8 -8,0 z M 40,104 l 8,0 0,8 -8,0 z M 56,104 l 8,0 0,8 -8,0 z M 72,104 l 8,0 0,8 -8,0 z M 80,104 l 8,0 0,8 -8,0 z M 88,104 l 8,0 0,8 -8,0 z M 104,104 l 8,0 0,8 -8,0 z M 120,104 l 8,0 0,8 -8,0 z M 128,104 l 8,0 0,8 -8,0 z M 144,104 l 8,0 0,8 -8,0 z M 152,104 l 8,0 0,8 -8,0 z M 160,104 l 8,0 0,8 -8,0 z M 192,104 l 8,0 0,8 -8,0 z M 208,104 l 8,0 0,8 -8,0 z M 216,104 l 8,0 0,8 -8,0 z M 8,112 l 8,0 0,8 -8,0 z M 40,112 l 8,0 0,8 -8,0 z M 48,112 l 8,0 0,8 -8,0 z M 80,112 l 8,0 0,8 -8,0 z M 112,112 l 8,0 0,8 -8,0 z M 128,112 l 8,0 0,8 -8,0 z M 152,112 l 8,0 0,8 -8,0 z M 160,112 l 8,0 0,8 -8,0 z M 176,112 l 8,0 0,8 -8,0 z M 184,112 l 8,0 0,8 -8,0 z M 192,112 l 8,0 0,8 -8,0 z M 200,112 l 8,0 0,8 -8,0 z M 232,112 l 8,0 0,8 -8,0 z M 40,120 l 8,0 0,8 -8,0 z M 56,120 l 8,0 0,8 -8,0 z M 96,120 l 8,0 0,8 -8,0 z M 104,120 l 8,0 0,8 -8,0 z M 120,120 l 8,0 0,8 -8,0 z M 152,120 l 8,0 0,8 -8,0 z M 184,120 l 8,0 0,8 -8,0 z M 192,120 l 8,0 0,8 -8,0 z M 200,120 l 8,0 0,8 -8,0 z M 208,120 l 8,0 0,8 -8,0 z M 216,120 l 8,0 0,8 -8,0 z M 8,128 l 8,0 0,8 -8,0 z M 32,128 l 8,0 0,8 -8,0 z M 96,128 l 8,0 0,8 -8,0 z M 112,128 l 8,0 0,8 -8,0 z M 120,128 l 8,0 0,8 -8,0 z M 152,128 l 8,0 0,8 -8,0 z M 168,128 l 8,0 0,8 -8,0 z M 176,128 l 8,0 0,8 -8,0 z M 184,128 l 8,0 0,8 -8,0 z M 224,128 l 8,0 0,8 -8,0 z M 40,136 l 8,0 0,8 -8,0 z M 56,136 l 8,0 0,8 -8,0 z M 80,136 l 8,0 0,8 -8,0 z M 96,136 l 8,0 0,8 -8,0 z M 120,136 l 8,0 0,8 -8,0 z M 128,136 l 8,0 0,8 -8,0 z M 136,136 l 8,0 0,8 -8,0 z M 168,136 l 8,0 0,8 -8,0 z M 208,136 l 8,0 0,8 -8,0 z M 216,136 l 8,0 0,8 -8,0 z M 8,144 l 8,0 0,8 -8,0 z M 16,144 l 8,0 0,8 -8,0 z M 24,144 l 8,0 0,8 -8,0 z M 48,144 l 8,0 0,8 -8,0 z M 64,144 l 8,0 0,8 -8,0 z M 88,144 l 8,0 0,8 -8,0 z M 104,144 l 8,0 0,8 -8,0 z M 112,144 l 8,0 0,8 -8,0 z M 128,144 l 8,0 0,8 -8,0 z M 136,144 l 8,0 0,8 -8,0 z M 144,144 l 8,0 0,8 -8,0 z M 152,144 l 8,0 0,8 -8,0 z M 160,144 l 8,0 0,8 -8,0 z M 168,144 l 8,0 0,8 -8,0 z M 176,144 l 8,0 0,8 -8,0 z M 184,144 l 8,0 0,8 -8,0 z M 192,144 l 8,0 0,8 -8,0 z M 200,144 l 8,0 0,8 -8,0 z M 216,144 l 8,0 0,8 -8,0 z M 232,144 l 8,0 0,8 -8,0 z M 8,152 l 8,0 0,8 -8,0 z M 24,152 l 8,0 0,8 -8,0 z M 40,152 l 8,0 0,8 -8,0 z M 56,152 l 8,0 0,8 -8,0 z M 88,152 l 8,0 0,8 -8,0 z M 120,152 l 8,0 0,8 -8,0 z M 128,152 l 8,0 0,8 -8,0 z M 136,152 l 8,0 0,8 -8,0 z M 144,152 l 8,0 0,8 -8,0 z M 168,152 l 8,0 0,8 -8,0 z M 192,152 l 8,0 0,8 -8,0 z M 200,152 l 8,0 0,8 -8,0 z M 216,152 l 8,0 0,8 -8,0 z M 8,160 l 8,0 0,8 -8,0 z M 24,160 l 8,0 0,8 -8,0 z M 32,160 l 8,0 0,8 -8,0 z M 104,160 l 8,0 0,8 -8,0 z M 128,160 l 8,0 0,8 -8,0 z M 144,160 l 8,0 0,8 -8,0 z M 192,160 l 8,0 0,8 -8,0 z M 200,160 l 8,0 0,8 -8,0 z M 224,160 l 8,0 0,8 -8,0 z M 8,168 l 8,0 0,8 -8,0 z M 48,168 l 8,0 0,8 -8,0 z M 56,168 l 8,0 0,8 -8,0 z M 72,168 l 8,0 0,8 -8,0 z M 80,168 l 8,0 0,8 -8,0 z M 104,168 l 8,0 0,8 -8,0 z M 112,168 l 8,0 0,8 -8,0 z M 128,168 l 8,0 0,8 -8,0 z M 152,168 l 8,0 0,8 -8,0 z M 168,168 l 8,0 0,8 -8,0 z M 176,168 l 8,0 0,8 -8,0 z M 184,168 l 8,0 0,8 -8,0 z M 192,168 l 8,0 0,8 -8,0 z M 200,168 l 8,0 0,8 -8,0 z M 216,168 l 8,0 0,8 -8,0 z M 224,168 l 8,0 0,8 -8,0 z M 232,168 l 8,0 0,8 -8,0 z M 72,176 l 8,0 0,8 -8,0 z M 80,176 l 8,0 0,8 -8,0 z M 88,176 l 8,0 0,8 -8,0 z M 128,176 l 8,0 0,8 -8,0 z M 168,176 l 8,0 0,8 -8,0 z M 200,176 l 8,0 0,8 -8,0 z M 208,176 l 8,0 0,8 -8,0 z M 216,176 l 8,0 0,8 -8,0 z M 224,176 l 8,0 0,8 -8,0 z M 232,176 l 8,0 0,8 -8,0 z M 8,184 l 8,0 0,8 -8,0 z M 16,184 l 8,0 0,8 -8,0 z M 24,184 l 8,0 0,8 -8,0 z M 32,184 l 8,0 0,8 -8,0 z M 40,184 l 8,0 0,8 -8,0 z M 48,184 l 8,0 0,8 -8,0 z M 56,184 l 8,0 0,8 -8,0 z M 72,184 l 8,0 0,8 -8,0 z M 88,184 l 8,0 0,8 -8,0 z M 96,184 l 8,0 0,8 -8,0 z M 104,184 l 8,0 0,8 -8,0 z M 128,184 l 8,0 0,8 -8,0 z M 152,184 l 8,0 0,8 -8,0 z M 160,184 l 8,0 0,8 -8,0 z M 168,184 l 8,0 0,8 -8,0 z M 184,184 l 8,0 0,8 -8,0 z M 200,184 l 8,0 0,8 -8,0 z M 208,184 l 8,0 0,8 -8,0 z M 216,184 l 8,0 0,8 -8,0 z M 8,192 l 8,0 0,8 -8,0 z M 56,192 l 8,0 0,8 -8,0 z M 80,192 l 8,0 0,8 -8,0 z M 88,192 l 8,0 0,8 -8,0 z M 96,192 l 8,0 0,8 -8,0 z M 128,192 l 8,0 0,8 -8,0 z M 136,192 l 8,0 0,8 -8,0 z M 160,192 l 8,0 0,8 -8,0 z M 168,192 l 8,0 0,8 -8,0 z M 200,192 l 8,0 0,8 -8,0 z M 8,200 l 8,0 0,8 -8,0 z M 24,200 l 8,0 0,8 -8,0 z M 32,200 l 8,0 0,8 -8,0 z M 40,200 l 8,0 0,8 -8,0 z M 56,200 l 8,0 0,8 -8,0 z M 72,200 l 8,0 0,8 -8,0 z M 80,200 l 8,0 0,8 -8,0 z M 96,200 l 8,0 0,8 -8,0 z M 136,200 l 8,0 0,8 -8,0 z M 152,200 l 8,0 0,8 -8,0 z M 168,200 l 8,0 0,8 -8,0 z M 176,200 l 8,0 0,8 -8,0 z M 184,200 l 8,0 0,8 -8,0 z M 192,200 l 8,0 0,8 -8,0 z M 200,200 l 8,0 0,8 -8,0 z M 216,200 l 8,0 0,8 -8,0 z M 224,200 l 8,0 0,8 -8,0 z M 232,200 l 8,0 0,8 -8,0 z M 8,208 l 8,0 0,8 -8,0 z M 24,208 l 8,0 0,8 -8,0 z M 32,208 l 8,0 0,8 -8,0 z M 40,208 l 8,0 0,8 -8,0 z M 56,208 l 8,0 0,8 -8,0 z M 72,208 l 8,0 0,8 -8,0 z M 88,208 l 8,0 0,8 -8,0 z M 104,208 l 8,0 0,8 -8,0 z M 112,208 l 8,0 0,8 -8,0 z M 128,208 l 8,0 0,8 -8,0 z M 136,208 l 8,0 0,8 -8,0 z M 152,208 l 8,0 0,8 -8,0 z M 168,208 l 8,0 0,8 -8,0 z M 208,208 l 8,0 0,8 -8,0 z M 216,208 l 8,0 0,8 -8,0 z M 8,216 l 8,0 0,8 -8,0 z M 24,216 l 8,0 0,8 -8,0 z M 32,216 l 8,0 0,8 -8,0 z M 40,216 l 8,0 0,8 -8,0 z M 56,216 l 8,0 0,8 -8,0 z M 72,216 l 8,0 0,8 -8,0 z M 80,216 l 8,0 0,8 -8,0 z M 88,216 l 8,0 0,8 -8,0 z M 112,216 l 8,0 0,8 -8,0 z M 120,216 l 8,0 0,8 -8,0 z M 152,216 l 8,0 0,8 -8,0 z M 160,216 l 8,0 0,8 -8,0 z M 168,216 l 8,0 0,8 -8,0 z M 184,216 l 8,0 0,8 -8,0 z M 192,216 l 8,0 0,8 -8,0 z M 200,216 l 8,0 0,8 -8,0 z M 208,216 l 8,0 0,8 -8,0 z M 216,216 l 8,0 0,8 -8,0 z M 224,216 l 8,0 0,8 -8,0 z M 8,224 l 8,0 0,8 -8,0 z M 56,224 l 8,0 0,8 -8,0 z M 72,224 l 8,0 0,8 -8,0 z M 80,224 l 8,0 0,8 -8,0 z M 88,224 l 8,0 0,8 -8,0 z M 104,224 l 8,0 0,8 -8,0 z M 112,224 l 8,0 0,8 -8,0 z M 128,224 l 8,0 0,8 -8,0 z M 136,224 l 8,0 0,8 -8,0 z M 152,224 l 8,0 0,8 -8,0 z M 168,224 l 8,0 0,8 -8,0 z M 176,224 l 8,0 0,8 -8,0 z M 208,224 l 8,0 0,8 -8,0 z M 224,224 l 8,0 0,8 -8,0 z M 8,232 l 8,0 0,8 -8,0 z M 16,232 l 8,0 0,8 -8,0 z M 24,232 l 8,0 0,8 -8,0 z M 32,232 l 8,0 0,8 -8,0 z M 40,232 l 8,0 0,8 -8,0 z M 48,232 l 8,0 0,8 -8,0 z M 56,232 l 8,0 0,8 -8,0 z M 72,232 l 8,0 0,8 -8,0 z M 104,232 l 8,0 0,8 -8,0 z M 120,232 l 8,0 0,8 -8,0 z M 128,232 l 8,0 0,8 -8,0 z M 176,232 l 8,0 0,8 -8,0 z M 184,232 l 8,0 0,8 -8,0 z M 200,232 l 8,0 0,8 -8,0 z M 208,232 l 8,0 0,8 -8,0 z M 216,232 l 8,0 0,8 -8,0 z " />
						</g>
					</svg>
				</div>
			</div>
		</SlideCover>
	</div>
</div>
