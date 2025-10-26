import { useAppDispatch } from '../app/hooks';
import {
  CartLineItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../features/cart/cartSlice';
import { currencyFormatter } from '../data/products';

export type CartItemProps = {
  item: CartLineItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleIncrease = () => dispatch(increaseQuantity(item.product.id));
  const handleDecrease = () => dispatch(decreaseQuantity(item.product.id));
  const handleRemove = () => dispatch(removeItem(item.product.id));

  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} loading="lazy" />
      <div className="cart-item-details">
        <h3>{item.product.name}</h3>
        <span className="cart-item-price">
          {currencyFormatter.format(item.product.price)} each
        </span>
        <div className="tag">{item.product.category}</div>
      </div>
      <div className="cart-item-actions">
        <div className="cart-quantity-controls" aria-label="Quantity controls">
          <button type="button" onClick={handleDecrease} aria-label="Decrease quantity">
            -
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button type="button" onClick={handleIncrease} aria-label="Increase quantity">
            +
          </button>
        </div>
        <div className="cart-item-total">
          {currencyFormatter.format(item.quantity * item.product.price)}
        </div>
        <button type="button" className="btn btn-outline" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
