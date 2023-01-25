import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async function ({ event, resolve }) {
    if (event.url.pathname !== '/' && !event.url.pathname.startsWith('/api')) {
        console.log('Redirecting')
        throw redirect(302, '/');
    }

    const response = await resolve(event);
    return response;
}