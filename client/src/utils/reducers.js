import {
    UPDATE_SONGS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';
    import { useReducer } from 'react';
    
    export const reducer = (state, action) => {
      switch (action.type) {
        // if action type value is the value of `UPDATE_SONGS`, return a new state object with an updated songs array
          case UPDATE_SONGS:
          return {
            ...state,
            songs: [...action.songs],
          };
  
          // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
          case UPDATE_CATEGORIES:
          return {
            ...state,
            categories: [...action.categories],
          };
  
          case UPDATE_CURRENT_CATEGORY:
          return {
              ...state,
              currentCategory: action.currentCategory
          };
  
          case ADD_TO_CART:
          return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.song]
          };
  
          case ADD_MULTIPLE_TO_CART:
          return {
            ...state,
            cart: [...state.cart, ...action.songs],
          };
  
          case REMOVE_FROM_CART:
          let newState = state.cart.filter(song => {
            return song._id !== action._id;
          });
          return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
          };
  
          case UPDATE_CART_QUANTITY:
          return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(song => {
              if (action._id === song._id) {
                song.purchaseQuantity = action.purchaseQuantity;
              }
              return song;
            })
          };
  
          case CLEAR_CART:
          return {
            ...state,
            cartOpen: false,
            cart: []
          };
          
          case TOGGLE_CART:
          return {
            ...state,
            cartOpen: !state.cartOpen
          };
    
        // if it's none of these actions, do not update state at all and keep things the same!
        default:
          return state;
      }
    };

export function useSongReducer(initialState) {
    return useReducer(reducer, initialState);
  }