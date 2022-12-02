import React from "react";
import Song from '../Song';

/* TODO: !!! */

function SongList() {

  function filterSongs() {
    console.log('filter songs');
  }

  return (
    <section className='my-2'>
      <h2>Songs:</h2>
      <div className='flex flex-row'>
        <Song />
        <Song />
        <Song />
        <Song />
      </div>
    </section>
  );
}

export default SongList;