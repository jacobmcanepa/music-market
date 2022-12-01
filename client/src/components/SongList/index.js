import React from "react";
import Song from '../Song';

function SongList() {
  return (
    <section>
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