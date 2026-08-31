import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { packages } from '../data/packages';
import './Packages.css';

export function Packages() {
  return (
    <div className="page packages-page">
      <header className="page-header container-wide">
        <p className="eyebrow">Starting Points</p>
        <h1>Packages</h1>
        <p className="lede">
          Three ways to begin — refine every detail as you build your celebration.
        </p>
      </header>

      <div className="container packages-list">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 80}>
            <article className={`package-row ${pkg.highlighted ? 'is-highlighted' : ''}`}>
              <div className="package-intro">
                <h2>{pkg.name}</h2>
                <p className="package-tagline">{pkg.tagline}</p>
                {pkg.startingPrice != null ? (
                  <p className="package-price">
                    Starting from <strong>₹{pkg.startingPrice} L</strong>
                  </p>
                ) : (
                  <p className="package-price package-price-note">{pkg.priceNote}</p>
                )}
              </div>

              <ul className="package-inclusions">
                {pkg.inclusions.map((item) => (
                  <li key={item.text}>{item.text}</li>
                ))}
              </ul>

              <div className="package-cta">
                <Button to={pkg.ctaLink} variant={pkg.highlighted ? 'primary' : 'secondary'}>
                  {pkg.cta}
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="section container">
        <p className="lede">
          Prefer to explore freely?{' '}
          <Link to="/plan/build" className="link-underline">
            Build your celebration
          </Link>{' '}
          and receive an estimated investment range.
        </p>
      </section>
    </div>
  );
}
