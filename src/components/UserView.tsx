import { observer } from 'mobx-react';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Order } from '../models/OrderDto';

export const UserView = observer(() => {

    const { orderStore } = useStore();

    return (
        <div>
        {(orderStore.orders ?? []).map(o => {
          console.log(o)
          return(
          <div key={o.name} className="record">
            <p>{o.name}</p>
            <p>{`${o.approved}`}</p>
            <p>{o.contractor}</p>
            <p>{o.deliveryTime.toString()}</p>
          </div>
          )})
        }
      </div>
    )
})