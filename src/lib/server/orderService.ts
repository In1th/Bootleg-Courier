import type { Order } from "$lib/models/dtos";
import type { Status } from "$lib/stores/orderStore";
import { orders } from "./firebase";
import { Timestamp } from 'firebase-admin/firestore';

type Snapshot = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>

export async function getUserOrders(userId: string){
    const snapshot = await orders.where("contractor", "==", userId).get()
    return getOrdersFrom(snapshot)
}

export async function getOrders(){
    const snapshot = await orders.get()
    return getOrdersFrom(snapshot)
}

async function getOrdersFrom(snapshot: Snapshot) {
    const list = snapshot.docs.map(doc => doc.data());
    return list
}

export async function addOrder(order: Order) {
    const document = orders.doc();

    const ts = Timestamp.fromDate(order.deliveryTime)

    document.set({
        id: document.id,
        name: order.name,
        contractor: order.contractor,
        quantity: order.quantity,
        cost: order.cost,
        approved: order.approved,
        deliveryTime: new Timestamp(ts.seconds, ts.nanoseconds)
    })

    return document.id;
}

export async function approveOrder(id: string, approved: Status, date: Date){
    const document = orders.doc(id);

    const snap = await document.get();
    const data = snap.data();

    if (!data){
        throw new Error('Document not found!');
    }
    const ts = Timestamp.fromDate(date)

    document.set( {
        id: data.id,
        name: data.name,
        contractor: data.contractor,
        approved: approved,
        quantity: data.quantity,
        cost: data.cost,
        deliveryTime: new Timestamp(ts.seconds, ts.nanoseconds) //weird types thing
    })

}

export async function deleteOrder(id: string, userId: string, isAdmin: boolean){
    const document = orders.doc(id);

    const snap = await document.get();
    const data = snap.data();

    if (!data){
        throw new Error('Document not found!');
    }
    
    if (data.contractor !== userId && !isAdmin){
        throw new Error('Now enough permissions!');
    }

    await document.delete();
}