import { ErrorResponse } from "$lib/server/api";
import { getOrders, getUserOrders } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url}) => {

    const user = url.searchParams.get('user');
    try{
        const response = !user? await getOrders() : await getUserOrders(user);
        return new Response(JSON.stringify(response));
    }
    catch (e){
        console.log(e)
        return ErrorResponse(500, 'An unknown error has occured');
    }
};