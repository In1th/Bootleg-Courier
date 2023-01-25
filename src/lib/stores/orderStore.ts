import { writable } from "svelte/store";

export type Status = 'pending' | 'approved' | 'rejected';

export class Order{
    id = '';
    name = '';
    contractor = '';
    quantity = 0;
    cost = 0.0;
    approved: Status = 'pending';
    deliveryTime: Date = new Date();

    static pastDelivery(order: Order){
        if (order.approved === 'approved'){
            return order.deliveryTime < new Date();
        }
        else return false;
    }
}

export class OrderStore {
    
    orders: Promise<Order[]>;

    constructor() {
        this.orders = this.cheat()
    }

    async cheat(){
        return [] as Order[]
    }

    async getUserOrders(userId: string){
        return this.getOrders(`/api/orders?user=${userId}`)
    }

    async getAllOrders(){
        return this.getOrders('/api/orders')
    }

    async get(admin: boolean, userId?: string){
        if (admin){
            return this.getAllOrders()
        }
        else if (userId){
            return this.getUserOrders(userId)
        }
    }

    async getOrders(url: string) {
        const response = await (await fetch(url)).json()
        return response.map((order: any) => {
            return {
                id: order.id,
                name: order.name,
                contractor: order.contractor,
                approved: order.approved,
                quantity: order.quantity,
                cost: order.cost,
                deliveryTime: new Date(order.deliveryTime._seconds * 1000)
            } as Order;
        })
	}

    async setOrder(order: Order){
        const body = {
            name: order.name,
            contractor: order.contractor,
            quantity: order.quantity,
            cost: order.cost
        }

        const response = await (await fetch(`/api/orders/new`, {
            method: 'POST',
            body: JSON.stringify(body)
        })).json()

        order.id = response.orderId;

    }

    async approveOrder(order: Order, approved: Status){
        const body = {
            approved: approved,
            date: order.deliveryTime.toDateString()
        }

        await fetch(`/api/orders/${order.id}/approve`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(body)
        });

    }

    async deleteOrder(orderId: string, userId: string, isAdmin: boolean){
        const body = {
            userId: userId,
            isAdmin: isAdmin
        }

        await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(body)
        });

    }
}

export const orderStore = writable(new OrderStore());