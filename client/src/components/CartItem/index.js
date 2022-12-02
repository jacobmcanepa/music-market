import React from 'react';

const CartItem = () => {

  const removeFromCart = () => {
    console.log('remove from cart');

  };

  return (
    <div>
      <div>
        <img
          src=''
          alt=''
        />
      </div>
      <div>
        <div>item name, $item price</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"

          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart()}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;