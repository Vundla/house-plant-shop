import { Link, NavLink, useLocation } from 'react-router-dom';
import { selectCartTotalCount } from '../features/cart/cartSlice';
import { useAppSelector } from '../app/hooks';

const Header = () => {
  const itemCount = useAppSelector(selectCartTotalCount);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Verdant Vibes
        </Link>
        <nav className="nav" aria-label="Main Navigation">
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Shop Plants
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
            Cart
          </NavLink>
          <p className="tag" aria-hidden="true">
            Curated Collection
          </p>
        </nav>
        <Link to={location.pathname === '/cart' ? '/products' : '/cart'}
          className="cart-indicator"
          aria-label={`Cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="9" cy="21" r="1.75" />
            <circle cx="19" cy="21" r="1.75" />
            <path d="M2.5 3h2.52l2.28 12.05a1.5 1.5 0 0 0 1.48 1.22h8.9a1.5 1.5 0 0 0 1.48-1.22l1.34-7.33H6.1" />
          </svg>
          <span aria-live="polite">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
