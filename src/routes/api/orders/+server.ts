import { ErrorResponse, ValidateCookies } from "$lib/server/api";
import { getUserOrders } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, request}) => {

    const user = url.searchParams.get('user');
    if (!user){
        return ErrorResponse(400, 'No user ID provided');
    }
    
    try{
        const _ = await ValidateCookies(request.headers.get('Cookies'), user)

        const response = await getUserOrders(user);
        return new Response(JSON.stringify(response));
    }
    catch (e: any){
        console.log(e)
        return ErrorResponse(500, e.message);
    }
};