<script lang="ts">
	import { checkTodo, createTodo, getTodos, removeTodo } from './todos.remote';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Admin area</h1>
	<form {...createTodo} class=" rounded-2xl border-2 border-lime-300 p-4 shadow-2xl">
		<h2 class="text-center text-2xl">What do you need to do?</h2>
		<div class="flex">
			<label>
				<input
					{...createTodo.fields.title.as('text')}
					autocomplete="off"
					class="rounded-l-xl border border-r-0 border-b-indigo-400 p-2"
				/>
			</label>
			<button
				class="rounded-r-xl bg-linear-to-bl/oklch from-black to-indigo-600 p-2 font-bold text-white"
				>Add to list</button
			>
		</div>
	</form>

	<br />
	<ul>
		{#each Object.entries(await getTodos()) as [id, todo] (id)}
			<li class="flex gap-2 p-1.5">
				<form {...checkTodo.for(id)}>
					<input {...checkTodo.fields.id.as('hidden', id)} />
					<button>
						{todo.done ? '✅' : '⭕'}
					</button>
				</form>
				<span>{todo.title}</span>
				<form {...removeTodo.for(id)} class="ml-auto">
					<input {...removeTodo.fields.id.as('hidden', id)} />
					<button> 🗑️ </button>
				</form>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
	form {
		corner-shape: squircle;
	}
</style>
