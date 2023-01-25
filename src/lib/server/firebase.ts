import { credential, firestore, initializeApp, type ServiceAccount } from "firebase-admin";
import { DATABASE_URL } from "$env/static/private";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import secrets from './cert.json';

export const firebase = initializeApp({
  credential: credential.cert(secrets as ServiceAccount),
  databaseURL: DATABASE_URL
}, "server");

const fs = firestore(firebase)

export const users = fs.collection('users');
export const orders = fs.collection('orders');