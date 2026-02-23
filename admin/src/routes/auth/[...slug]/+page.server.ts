import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async (event) => {
		// log the user in
        event.cookies.set('session', crypto.randomUUID(), { path: '/' });
        redirect(303, '/')
        return { success: true };
	},
	logout: async (event) => {
        // log the user in
        event.cookies.delete('session', { path: '/' });
        redirect(303, '/auth/login')
	},
	fail: async (event) => {
		return fail(400, {fail: true});
	}
};