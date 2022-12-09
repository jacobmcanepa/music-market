import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

/* FIXME: STYLING */
function Song(item) {
  const [state, dispatch] = useStoreContext();

  const { name, _id, price, category } = item;
  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      // If the item is already in the cart, return without adding it again
      return;
    }
  
    dispatch({
      type: ADD_TO_CART,
      song: { ...item, purchaseQuantity: 1 },
    });
    idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  };

	return (
		<div className="basis-1/4 p-2 song-card">
			<p className="text-black">{name}</p>

			<div className="text-black">
				<div>{category}</div>
				<span>${price}</span>
			</div>
			<button
				onClick={addToCart}
				className="px-4 py-1 m-1 transition ease-in-out delay-150 bg-emerald-200 hover:-translate-y-1 hover:scale-110 hover:bg-teal-300 duration-300 rounded-md drop-shadow-xl"
			>
				Add to cart
			</button>
		</div>
	);
}

export default Song;
