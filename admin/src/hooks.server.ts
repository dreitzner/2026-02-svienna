import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api') || event.url.pathname.startsWith('/auth')) {
		return resolve(event);
	}

	// check auth
	const session = event.cookies.get('session');
	if (!session) return redirect(307, '/auth/login');
	event.locals.session = session;
	return resolve(event);
};
