import React, { useEffect } from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";

/* TODO: !!! */

function Cart() {

  function submitCheckout() {
    console.log('submit checkout');
  }

  return (
    <section>
      <div>
        [close]
      </div>
      <h2>Shopping Cart</h2>

        <div>

            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />

          <div>
            <strong>Total: $___</strong>

            <button onClick={submitCheckout}>Checkout</button>
          </div>

        </div>

    </section>
  );
}

export default Cart;
