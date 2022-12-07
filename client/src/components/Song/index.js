import React from 'react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

/* FIXME: STYLING */
function Song(item) {
  const [state, dispatch] = useStoreContext();

  const {
    name,
    _id,
    price,
    category
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className='basis-1/4 p-1'>

      <p>{name}</p>

      <div>
        <div>{category}</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart} className='px-4 py-1 mx-1 bg-emerald-200 hover:bg-teal-300 rounded-md'>Add to cart</button>
    </div>
  );
}

export default Song;