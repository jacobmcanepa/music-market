import React, { useEffect } from 'react';
import Song from '../Song';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SONGS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SONGS} from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
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
    } else if (!loading) {
      idbPromise('songs', 'get').then((songs) => {
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
  
    return state.songs.filter(
      (song) => song.category._id === currentCategory);
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