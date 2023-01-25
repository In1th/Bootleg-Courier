import { ErrorResponse } from "$lib/server/api";
import { approveOrder } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request, params}) => {
    
    const id = params.id;
    const {approved, date} = await request.json();

    if (!id || !approved || !date) {
        return ErrorResponse(400, 'Not enought data provided!');
    }

    try{
        await approveOrder(id, approved, new Date(date));
        return new Response();
    }
    catch (e){
        console.log(e)
        return ErrorResponse(500, 'An unknown error has occured');
    }
};