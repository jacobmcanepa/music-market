import React from 'react';
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

/* TODO: !!! */
function Song() {
  const [state, dispatch] = useStoreContext();
  
  const addToCart = () => {
    dispatch({
      type: ADD_TO_CART,
      product: { ...item, purchaseQuantity: 1 }
    });
  };

  return (
    <div className='basis-1/4 p-1'>
      <p>song title</p>
      <div>
        $0
      </div>
      <button onClick={addToCart} className='px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md'>Add to cart</button>
    </div>
  );
}

export default Song;