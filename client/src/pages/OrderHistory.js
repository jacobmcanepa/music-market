import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-2 px-6 has-text-white">

        {user ? (
          <>
            <h2 className='is-size-4 pb-2'>
              Order History for <span className='font-bold'>{user.displayName}</span>
            </h2>
            {user.orders.length ? 
              (
                <>
                  {user.orders.map((order) => (
                    <div key={order._id} className="my-2">
                      <h3 className='text-xl'>
                        {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                      </h3>
                      <div className="flex flex-row">
                        {order.songs.map(({name, price, category }, index) => (
                          <div key={index} className="basis-1/4 p-1">

                            <p className='font-bold'>{name}</p>

                            <div>
                              <div className='italic'>{category.name}</div>
                              <span className='text-teal-100 font-bold'>${price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : 
              <div className='m-2 text-xl'>You haven't ordered anything yet!</div> 
            }
          </>
        ) : <div className='m-2 text-xl'>You must be logged in to view your order history!</div>}
      </div>
    </>
  );
}

export default OrderHistory;