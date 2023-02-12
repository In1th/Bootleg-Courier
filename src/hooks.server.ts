import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async function ({ event, resolve }) {
    if (event.url.pathname !== '/' && !event.url.pathname.startsWith('/api')) {
        console.log('Redirecting')
        throw redirect(302, '/');
    }

    if (event.url.pathname.startsWith('/api') 
        && !event.url.pathname.startsWith('/api/auth')){
        const cookies = event.cookies.get('__session');
        event.request.headers.append('Cookies', `__session=${cookies}`)
    }

    const response = await resolve(event);
    return response;
}