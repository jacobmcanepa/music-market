<<<<<<< HEAD
import React from "react";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

/* TODO: !!! */
function Song(item) {
  const [state, dispatch] = useStoreContext();
  
  const {
     name,
    _id,
    price,
    quantity
  } = item;

 
  const { cart } = state;
  
=======
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

>>>>>>> develop
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
<<<<<<< HEAD
        song: { ...item, purchaseQuantity: 1 }
=======
        product: { ...item, purchaseQuantity: 1 }
>>>>>>> develop
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
<<<<<<< HEAD
    <div className="card px-1 py-1">
      {/* <Link to={`/song/${_id}`}>      
        <img 
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link> */}
      <p>{name}</p>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
=======
    <div className='basis-1/4 p-1'>

      <p>{name}</p>

      <div>
        <div>{category}</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart} className='px-4 py-1 mx-1 bg-emerald-200 hover:bg-teal-300 rounded-md'>Add to cart</button>
>>>>>>> develop
    </div>
  );
}

export default Song;