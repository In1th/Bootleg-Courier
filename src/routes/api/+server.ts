import { apiKey, appId, authDomain, databaseURL, measurementId, messagingSenderId, projectId, storageBucket } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export const GET: RequestHandler = async () => {
    
    const key = "Project for WWW Tech";

    const encrypt = (word: string) => Base64.stringify(hmacSHA512(word, key))

    const config = {
      apiKey: encrypt(apiKey),
      authDomain: encrypt(authDomain),
      databaseURL: encrypt(databaseURL),
      projectId: encrypt(projectId),
      storageBucket: encrypt(storageBucket),
      messagingSenderId: encrypt(messagingSenderId),
      appId: encrypt(appId),
      measurementId: encrypt(measurementId)
    };

    return new Response(JSON.stringify(config));
};