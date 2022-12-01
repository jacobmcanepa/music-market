import React, { createContex, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
  });

    const useStoreContext = () => {
        return useContext(StoreContext);
      };
    return <Provider value={[state, dispatch]} {...props} />;
  };

  export { StoreProvider, useStoreContext };