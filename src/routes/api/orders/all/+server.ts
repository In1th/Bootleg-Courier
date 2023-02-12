import { ErrorResponse, ValidateCookies } from "$lib/server/api";
import { getOrders } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, request}) => {
    
    const user = url.searchParams.get('user');
    if (!user){
        return ErrorResponse(400, 'No user ID provided');
    }
    
    try{
        const usrRole = await ValidateCookies(request.headers.get('Cookies'), user);

        if (usrRole !== 'admin'){
            return ErrorResponse(400, 'Attempting to get all orders as non-admin');
        }

        const response = await getOrders();
        return new Response(JSON.stringify(response));
    }
    catch (e: any){
        console.log(e)
        return ErrorResponse(500, e.message);
    }
};