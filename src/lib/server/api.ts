
export function ErrorResponse(code: number, message: string){
    return new Response(JSON.stringify({
        message
    }),
    {status: code});
}