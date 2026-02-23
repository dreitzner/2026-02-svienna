import * as v from 'valibot';
import { error, invalid, redirect } from '@sveltejs/kit';
import { query, form } from '$app/server';

const TODOS: {
	[id: string]: {
		title: string;
		done: boolean;
	};
} = {
};

TODOS[crypto.randomUUID()] = {
    done: true,
    title: 'create talk',
}
TODOS[crypto.randomUUID()] = {
    done: false,
    title: 'give talk',
}
TODOS[crypto.randomUUID()] = {
    done: false,
    title: 'talk with people about svelte',
}
TODOS[crypto.randomUUID()] = {
    done: false,
    title: 'eat good food',
}

export const getTodos = query(async () => TODOS);

export const createTodo = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ title }) => {
		const id = crypto.randomUUID();
		TODOS[id] = {
			title,
			done: false
		};

        await getTodos().refresh();

		// Redirect to the overview
		redirect(303, `/`);
	}
);

export const checkTodo = form(
	v.object({
		id: v.pipe(v.string(), v.uuid('The UUID is badly formatted.'))
	}),
	async ({ id }, issue) => {
        const currentTodo = TODOS[id];
        if (!currentTodo) invalid(issue.id('This is not the ID you\'re looking for'))
		TODOS[id] = {
			...currentTodo,
			done: !currentTodo.done
		};

        await getTodos().refresh();

		// Redirect to the overview
		redirect(303, `/`);
	}
);
export const removeTodo = form(
	v.object({
		id: v.pipe(v.string(), v.uuid('The UUID is badly formatted.'))
	}),
	async ({ id }) => {
        
        delete TODOS[id];

        await getTodos().refresh();

		// Redirect to the overview
		redirect(303, `/`);
	}
);
