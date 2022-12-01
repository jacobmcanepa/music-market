import React from "react";

function Song() {
  const addToCart = () => {
    console.log('add to cart');
  }

  return (
    <div className='basis-1/4'>
      <p>song title</p>
      <button onClick={addToCart} className='px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md'>Add to cart</button>
    </div>
  );
}

export default Song;