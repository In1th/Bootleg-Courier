import { users } from "./firebase";

export async function fetchUserData(uid: string){
    const docRef = users.doc(uid);
    const docSnap = await docRef.get();
    const result = docSnap.data();
    if (result){
        return {
            name: result.name,
            role: result.isAdmin? 'admin': 'user'
        }
    }
    return {name: '', role: 'user'};
}