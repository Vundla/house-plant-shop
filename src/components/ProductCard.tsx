import { memo, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addItem, makeSelectIsInCart } from '../features/cart/cartSlice';
import type { Product } from '../data/products';
import { currencyFormatter } from '../data/products';

export type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const selectIsInCart = useMemo(() => makeSelectIsInCart(product.id), [product.id]);
  const isInCart = useAppSelector(selectIsInCart);

  const handleAdd = () => {
    dispatch(addItem(product));
  };

  return (
    <article className="product-card" aria-label={`${product.name} plant card`}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-card-content">
        <div className="tag" aria-label={`Category: ${product.category}`}>
          {product.category}
        </div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{currencyFormatter.format(product.price)}</div>
        <button
          type="button"
          className="btn"
          onClick={handleAdd}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};

export default memo(ProductCard);
