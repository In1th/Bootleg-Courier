import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { FirebaseApi } from "../api/FirebaseApi";
import { StoreData } from "../hooks/useStore";

export class AppStore{
    @observable isLoading: boolean = false;
    @observable loggedIn: boolean = false;

    constructor(
        readonly api: FirebaseApi
    ){
        makeObservable(this);
    }

    @action
    init(stores: StoreData){
        this.isLoading = true;

        stores.orderStore.getOrders(this.api);

        this.isLoading = false;
    }

    @action
    setLoggedIn(val: boolean){
        console.log('a', this.loggedIn, val);
        this.loggedIn = val
    }
}