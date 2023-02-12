import type { RequestHandler } from "@sveltejs/kit";
import * as cookie from 'cookie';
import { getAuth, type SessionCookieOptions } from "firebase-admin/auth";
import { firebase } from "$lib/server/firebase";
import { ErrorResponse } from "$lib/server/api";
import { fetchUserData } from "$lib/server/userService";

export const GET: RequestHandler = async ({ url, request }) => {

    const user = url.searchParams.get('user');
    if (!user) {
        return ErrorResponse(400, 'No user ID provided');
    }
    const auth = request.headers.get('Authorization');

    if (!auth || !auth.startsWith('Bearer ')) {
        return ErrorResponse(400, 'Invalid authorization token');
    }

    const token = auth.replace('Bearer ', '');

    const options: SessionCookieOptions = {
        expiresIn: 60 * 60 * 1000
    }

    try {
        const authFirebase = getAuth(firebase)
        const cookies = await authFirebase.createSessionCookie(token, options)

        const { uid } = await authFirebase.verifySessionCookie(cookies);

        if (uid !== user) {
            return ErrorResponse(400, 'Invalid authorization token');
        }

        const userDto = await fetchUserData(uid);

        const headers = {
            'Set-Cookie': `${cookie.serialize('__session', cookies, {
                httpOnly: true,
                maxAge: 60 * 60,
                sameSite: 'lax',
                path: '/'
            })}`
        }
        return new Response(JSON.stringify({
            name: userDto.name,
            role: userDto.role
        }), {
            status: 200,
            headers: headers
        });

    }
    catch (e) {
        console.log(e);
        return ErrorResponse(500, 'Authorization went wrong');
    }

};