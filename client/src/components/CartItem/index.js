import React from 'react';

/* TODO: !!! */
const CartItem = () => {

  const removeFromCart = () => {
    console.log('remove from cart');

  };

  const onChange = (e) => {
    console.log('on change');
  };

  return (
    <div className='flex flex-row'>
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
          {/* FIXME:  change VALUE to '{item.purchaseQuantity}' */}
          <input
            type='number'
            placeholder='1'
            value='1'
            onChange={onChange}
          />

          {/* FIXME:  change 'removeFromCart()' to 'removeFromCart(item)' */}
          <span
            role='img'
            aria-label='trash'
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