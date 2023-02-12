import { ErrorResponse, ValidateCookies } from "$lib/server/api";
import { deleteOrder } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({params, request}) => {

    const id = params.id;
    const {userId} = await request.json();
    if (!id || !userId) {
        return ErrorResponse(400, 'Not enought data provided!');
    }

    try{
        const usrRole = await ValidateCookies(request.headers.get('Cookies'), userId);

        await deleteOrder(id, userId, usrRole);
        return new Response(JSON.stringify({message: `Order ${id} deleted`}));
    }
    catch (e: any){
        return ErrorResponse(500, e.message);
    }

};