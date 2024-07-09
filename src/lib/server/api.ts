import { getAuth } from "firebase-admin/auth";
import { firebase } from "./firebase";
import { fetchUserData } from "./userService";

export function ErrorResponse(code: number, message: string){
    return new Response(JSON.stringify({
        message
    }),
    {status: code});
}

export async function ValidateCookies(cookies: string | null, user: string){
    if (!cookies || !cookies.startsWith('__session=')){
        throw new Error('Wrong cookie header')
    }

    if (cookies.split(';').length > 1){
        throw new Error('Too many cookies provided')
    }

    const cookie = cookies.replace('__session=', '')

    const auth = getAuth(firebase);

    const {uid} = await auth.verifySessionCookie(cookie);

    if (uid !== user){
        throw new Error('Cookie validation failed')
    }

    return (await fetchUserData(uid)).role;
}