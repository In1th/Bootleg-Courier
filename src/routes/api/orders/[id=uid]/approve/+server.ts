import { ErrorResponse, ValidateCookies } from "$lib/server/api";
import { approveOrder } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request, params}) => {
    
    const id = params.id;
    const {approvedBy, approved, date} = await request.json();

    if (!id || !approvedBy || !approved || !date) {
        return ErrorResponse(400, 'Not enought data provided!');
    }

    try{
        const usrRole = await ValidateCookies(request.headers.get('Cookies'), approvedBy);

        if (usrRole !== 'admin'){
            return ErrorResponse(400, 'Trying to approve as user!');
        }

        await approveOrder(id, approved, new Date(date));
        return new Response();
    }
    catch (e: any){
        console.log(e)
        return ErrorResponse(500, e.message);
    }
};