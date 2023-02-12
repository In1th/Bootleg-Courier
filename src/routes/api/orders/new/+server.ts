import { Order } from "$lib/models/dtos";
import { ErrorResponse, ValidateCookies } from "$lib/server/api";
import { addOrder } from "$lib/server/orderService";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    
    const {
        name,
        contractor,
        quantity,
        cost
    } = await request.json();

    if (name === undefined
        || contractor === undefined
        || quantity === undefined
        || cost === undefined){
        return ErrorResponse(400, 'Not enought data provided!');
    }
    try{
        const _ = await ValidateCookies(request.headers.get('Cookies'), contractor)

        const order = new Order();
        order.name = name;
        order.contractor = contractor;
        order.quantity = quantity;
        order.cost = cost;
        const id = await addOrder(order);
        return new Response(JSON.stringify({orderId: id}));
    }
    catch (e){
        console.log(e)
        return ErrorResponse(500, 'An unknown error has occured');
    }
};