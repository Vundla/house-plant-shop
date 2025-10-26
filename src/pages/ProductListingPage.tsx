import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, type Product, type ProductCategory } from '../data/products';

const ProductListingPage = () => {
  const groupedProducts = useMemo(() => {
    return products.reduce<Record<ProductCategory, Product[]>>(
      (acc, product) => {
        acc[product.category] = acc[product.category] ?? [];
        acc[product.category].push(product);
        return acc;
      },
      {
        'Low Light': [],
        'Pet Friendly': [],
        'Air Purifying': [],
      },
    );
  }, []);

  return (
    <div className="products-page">
      <section className="section">
        <header className="category-header" role="presentation">
          <span className="tag">Our Signature Selection</span>
          <h2 className="hero-title" style={{ color: 'var(--color-primary)', fontSize: '2.75rem' }}>
            Find the Perfect Plant Match
          </h2>
          <p className="hero-copy" style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
            Shop six distinctive houseplants curated by horticulturists for style, resilience,
            and the wellness benefits they bring to your routine.
          </p>
        </header>
        <div className="grid" style={{ gap: '2.5rem' }}>
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <section key={category} className="category-section" aria-labelledby={`${category}-heading`}>
              <div className="category-header">
                <h3 id={`${category}-heading`} className="category-title">
                  {category}
                </h3>
                <p className="product-description" style={{ marginBottom: 0 }}>
                  {category === 'Low Light' && 'Thrives in spaces with minimal direct sunlight—perfect for offices and cozy corners.'}
                  {category === 'Pet Friendly' && 'Non-toxic beauties that coexist happily with curious cats and playful pups.'}
                  {category === 'Air Purifying' && 'Top performers at filtering indoor air, keeping your home feeling crisp and calm.'}
                </p>
              </div>
              <div className="product-grid">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListingPage;
