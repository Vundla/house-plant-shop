import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import {
  selectCartItemsArray,
  selectCartTotalCount,
  selectCartTotalPrice,
} from '../features/cart/cartSlice';
import { useAppSelector } from '../app/hooks';
import { currencyFormatter } from '../data/products';

const CartPage = () => {
  const items = useAppSelector(selectCartItemsArray);
  const totalItems = useAppSelector(selectCartTotalCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const hasItems = items.length > 0;

  return (
    <div className="cart-page">
      <div className="cart-layout">
        <section className="cart-card" aria-labelledby="cart-heading">
          <div>
            <h2 id="cart-heading">Your Shopping Cart</h2>
            <p className="product-description" style={{ marginBottom: 0 }}>
              {hasItems
                ? 'Adjust quantities, remove items, or continue shopping to find more green companions.'
                : 'Your cart is empty. Add your favorite plants to bring natural calm into your home.'}
            </p>
          </div>
          {hasItems ? (
            <div className="cart-items">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-cart" role="status">
              Your cart is empty.
            </div>
          )}
        </section>
        <aside className="cart-summary" aria-labelledby="order-summary-heading">
          <h3 id="order-summary-heading">Order Summary</h3>
          <div className="summary-row">
            <span>Total plants</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row summary-total" aria-live="polite">
            <span>Total due</span>
            <span>{currencyFormatter.format(totalPrice)}</span>
          </div>
          <div className="footer-actions">
            <button
              type="button"
              className="btn"
              onClick={() => alert('Checkout coming soon!')}
              disabled={!hasItems}
            >
              Checkout
            </button>
            <Link to="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
