<script lang="ts">
	import { getTodos } from '$lib/remote/todos.remote';
</script>

<ul>
	{#each Object.entries(await getTodos()) as [id, todo] (id)}
		<li class="flex gap-2 p-1.5">
			{todo.done ? '✅' : '⭕'}
			<span>{todo.title}</span>
		</li>
	{/each}
</ul>
