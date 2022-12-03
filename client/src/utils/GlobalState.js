import React, { createContext, useContext } from 'react';
import { useSongReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useSongReducer({
        songs: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });

    const useStoreContext = () => {
        return useContext(StoreContext);
    };
    return <Provider value={[state, dispatch]} { ...props} />;

};

export { StoreProvider, useStoreContext};