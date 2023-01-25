import type { User } from "firebase/auth";
import { writable } from "svelte/store";

export type Role = 'user' | 'admin';

export class UserStore{
    id = '';
    name = '';
    email = '';
    photoUrl?: string = '';
    role: Role = 'user';
    loggedIn = false;

    constructor(
        private readonly _token?: string
    ) {
        
    }

    get authHeader(){
        return 'Basic ' + this._token ?? '';
    }

    static async GetUserFrom(userInfo: User){
        const response = await fetch(`/api/user?id=${userInfo.uid}`);
        if (response.status !== 200){
            throw new Error('Something went wrong when fetching user')
        }
        const data = await response.json();
        const user = new UserStore(await userInfo.getIdToken())
        user.id= userInfo.uid,
        user.email= userInfo.email ?? '',
        user.name= userInfo.displayName ?? data.role,
        user.photoUrl= userInfo.photoURL ?? undefined,
        user.role= data.role,
        user.loggedIn= true
        return user;
    }

    get isAdmin(){
        return this.role === 'admin';
    }
}

export const userStore = writable(new UserStore())