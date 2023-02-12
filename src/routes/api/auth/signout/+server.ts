import { firebase } from "$lib/server/firebase";
import type { RequestHandler } from "@sveltejs/kit";
import { getAuth } from "firebase-admin/auth";

export const DELETE: RequestHandler = async ({cookies}) => {
    const cookie = cookies.get('__session') ?? '';
    cookies.delete('__session', {path: '/'});
    const auth = getAuth(firebase)

    const claims = await auth.verifySessionCookie(cookie);
    await auth.revokeRefreshTokens(claims.sub)

    return new Response(JSON.stringify({
        message: 'Logged out!'
    }));
};