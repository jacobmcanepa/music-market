import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

    const [, dispatch] = useStoreContext();

    const onChange = (e) => {
        const value = e.target.value;
      
        if (value === '0') {
          dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
          });
        
          idbPromise('cart', 'delete', { ...item });
        } else {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: item._id,
            purchaseQuantity: parseInt(value)
          });
        
          idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
      };

    const removeFromCart = item => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    };
    
    return (
        <div className="flex-row">
        <div>
            <div>{item.name}, ${item.price}
            <span
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(item)}
            >
                🗑️
            </span>
            </div>
        </div>
        </div>
    );
}

export default CartItem;