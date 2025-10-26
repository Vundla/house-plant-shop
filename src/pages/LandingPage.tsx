import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="hero" role="img" aria-label="Sunlit greenhouse filled with lush plants">
      <div className="hero-content">
        <p className="hero-eyebrow">Verdant Vibes Studio</p>
        <h1 className="hero-title">Curated Houseplants for Effortless Living</h1>
        <p className="hero-copy">
          Verdant Vibes brings nature a little closer with resilient, design-forward plants
          that are hand-selected, sustainably grown, and delivered with concierge-level care
          guides. Elevate your space and breathe easier.
        </p>
        <Link to="/products" className="btn">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
