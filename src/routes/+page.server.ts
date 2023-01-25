// since there's no dynamic data here, we can prerender

import { apiKey, authDomain } from "$env/static/private";
import type { Load } from "@sveltejs/kit";

// it so that it gets served as a static asset in production

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async () => {

    const config = {
        apiKey: apiKey,
        authDomain: authDomain
    };

    return config;
}
