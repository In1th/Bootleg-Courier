import type { Auth } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import { writable } from "svelte/store";

export class FirebaseStore {
    app?: FirebaseApp;
    auth?: Auth;
}

export const firebaseStore = writable(new FirebaseStore())