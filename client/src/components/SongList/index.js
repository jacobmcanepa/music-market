import React, { useEffect } from 'react';
import Song from '../Song';
import { useQuery } from '@apollo/client';
import { QUERY_SONGS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SONGS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import spinner from '../../assets/spinner.gif';

/* TODO: !!! */

function SongList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_SONGS);

  useEffect(() => {
    if(data) {
      dispatch({
        type: UPDATE_SONGS,
        songs: data.songs
      });
  
      data.songs.forEach((song) => {
        idbPromise('songs', 'put', song);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `songs` store
      idbPromise('songs', 'get').then((songs) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_SONGS,
          songs: songs
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterSongs() {
    if (!currentCategory) {
      return state.songs;
    }
  
    return state.songs.filter(song => song.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Songs:</h2>
      {state.songs.length ? (
        <div className="flex-row">
          {filterSongs().map((song) => (
            <Song
              key={song._id}
              _id={song._id}
              name={song.name}
              price={song.price}
              quantity={song.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any songs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SongList;