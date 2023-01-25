import { flow, makeObservable, observable } from "mobx";
import { Order } from "../models/OrderDto";
import { FirebaseApi } from '../api/FirebaseApi';
import { DocumentData } from "firebase/firestore";

export class OrderStore{
    @observable orders?: Order[];

    getOrders = flow(function* (this: OrderStore, api: FirebaseApi){
        try{
            const response: DocumentData[] = yield api.getOrders();
            console.log('a')

            this.orders = observable(response.map(dd => new Order(dd)));
        }
        catch (e){
            console.log(e);
        }
    });

    constructor(){
        makeObservable(this);
    }
}