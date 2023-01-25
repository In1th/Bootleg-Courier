import type { RequestHandler } from "@sveltejs/kit";
import {v4 as uuid} from 'uuid'
import * as cookie from 'cookie';

export const POST: RequestHandler = async ({request}) => {
    
    const body = await request.json();

    const id = uuid()

    const headers = {
        'Set-Cookie': `${cookie.serialize('session_id', id, {
            httpOnly: true,
            maxAge: 60 * 60,
            sameSite: 'lax',
            path: '/'
        })}`
    }


    return new Response(JSON.stringify({
        message: 'Success!'
    }), {
        status: 200,
        headers: headers
    })
};