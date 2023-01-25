import React, { ReactNode } from "react";
import { AppStore } from "../stores/AppStore";
import { OrderStore } from "../stores/OrderStore";

export interface StoreData{
    appStore: AppStore;
    orderStore: OrderStore;
}

export class StoreDataInitial{
    appStore?: AppStore;
    orderStore?: OrderStore;
}

const Context = React.createContext(new StoreDataInitial());

export function useStore(){
    const ctx = React.useContext(Context);

    return ctx as StoreData;
}

export interface ContextProvider{
    store: StoreData;
    children: ReactNode;
}

export const ContextProvider = ({store, children}: ContextProvider) => {
    return (
        <Context.Provider value={store}>{children}</Context.Provider>
    )
};