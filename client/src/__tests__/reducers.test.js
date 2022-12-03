// import our actions
import {
    UPDATE_SONGS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
  } from '../utils/actions';
  import { reducer } from '../utils/reducers';
  // create a sample of what our global state will look like
  const initialState = {
    songs: [],
    categories: [{ name: 'Rap' }],
    currentCategory: '1',
  };

  test ('UPDATE_SONGS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_SONGS,
        songs: [{},{}]
    });
    expect(newState.songs.length).toBe(2);
    expect(initialState.songs.length).toBe(0);
  })

  test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CATEGORIES,
      categories: [{}, {}]
    });
  
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
  });

  test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: '2'
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });