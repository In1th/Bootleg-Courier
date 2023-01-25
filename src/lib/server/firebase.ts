import admin from "firebase-admin";
import { DATABASE_URL } from "$env/static/private";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import secrets from './cert.json';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(secrets as admin.ServiceAccount),
  databaseURL: DATABASE_URL
}, "server");

const fs = admin.firestore(firebase)

export const users = fs.collection('users');
export const orders = fs.collection('orders');