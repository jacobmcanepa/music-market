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
        <div style={{display: "flex", alignItems: "flex-end"}}>
          <div>{item.name} - - ${item.price}</div>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
            style={{marginLeft: "auto", cursor: "pointer"}}
          >
            🗑️
          </span>
        </div>
        </div>
    );
}

export default CartItem;