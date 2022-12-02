import React from 'react';
import CartItem from '../CartItem';

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
