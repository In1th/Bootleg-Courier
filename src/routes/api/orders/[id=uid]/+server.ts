import { ErrorResponse } from "$lib/server/api";
import { deleteOrder } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({params, request}) => {

    const id = params.id;
    const {userId, isAdmin} = await request.json();
    if (!id || !userId) {
        return ErrorResponse(400, 'Not enought data provided!');
    }

    try{
        await deleteOrder(id, userId, isAdmin);
        return new Response(JSON.stringify({message: `Order ${id} deleted`}));
    }
    catch (e){
        console.log(e)
        return ErrorResponse(500, 'An unknown error has occured');
    }

};