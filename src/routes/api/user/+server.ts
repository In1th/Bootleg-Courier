import { ErrorResponse } from "$lib/server/api";
import { fetchUserData } from "$lib/server/userService";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url}) => {
    
    const id = url.searchParams.get('id')

    if (id === null){
        return ErrorResponse(400, 'No id provided!');
    }
    try{
        const response = await fetchUserData(id);
        return new Response(JSON.stringify(response));
    }
    catch (e){
        console.log(e)
        return ErrorResponse(500, 'An unknown error has occured');
    }


};