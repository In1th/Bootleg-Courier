import type { Status } from "$lib/stores/orderStore";

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