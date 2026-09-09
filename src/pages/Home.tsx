import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SITE } from '../config/site';
import { faqs, testimonials } from '../data/brand';
import { coreAreas, homeServicePreview } from '../data/services';
import { getFeaturedWeddings } from '../data/weddings';
import './Home.css';

const heroImage =
  'https://res.cloudinary.com/ddhhlkyut/image/upload/v1788951230/redgh_r9unml.png';

export function Home() {
  const featured = getFeaturedWeddings();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-media">
          <img
            src={heroImage}
            alt="A destination wedding celebration in Goa"
            fetchPriority="high"
          />
          <div className="hero-veil" />
        </div>
        <div className="hero-content container-wide">
          <h1>
            <span className="display-line">Your Celebration,</span>
            <span className="display-line">Beautifully Planned.</span>
          </h1>
          <p>
            Premium destination and beach wedding planning in Goa — crafted around your story,
            with calm process and considered hospitality.
          </p>
          <div className="btn-group hero-actions">
            <Button to="/plan/build" variant="primary" className="hero-btn">
              Start Planning Your Wedding
            </Button>
            <Button to="/weddings" variant="secondary" className="hero-btn hero-btn-light">
              Explore Our Weddings
            </Button>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container">
          <Reveal>
            <h2>
              Goa is the backdrop.
              <br />
              Your story is the celebration.
            </h2>
            <p className="lede intro-copy">
              Since {SITE.foundingYear}, Goa Celebrations has planned destination and beach weddings
              across Goa — from Haldi and Mehendi to ceremony day — with design, coordination and
              guest care that feel personal.
            </p>
          </Reveal>

          <div className="core-areas">
            {coreAreas.map((area, i) => (
              <Reveal key={area.number} delay={i * 80}>
                <article className="core-area">
                  <span className="core-num">{area.number}</span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container-wide">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Selected Work</p>
              <h2>Featured Weddings</h2>
            </div>
          </Reveal>

          <div className="featured-editorial">
            {featured.map((wedding, i) => (
              <Reveal key={wedding.id} delay={i * 60}>
                <article className={`featured-item size-${wedding.featuredSize || 'medium'}`}>
                  <Link to={`/weddings/${wedding.slug}`} className="featured-link">
                    <div className="featured-image">
                      <img src={wedding.coverImage} alt={wedding.name} loading="lazy" />
                    </div>
                    <div className="featured-meta">
                      <h3>{wedding.name}</h3>
                      <p>
                        {wedding.location} · {wedding.days} Day{wedding.days > 1 ? 's' : ''}
                      </p>
                      <p className="featured-desc">{wedding.shortDescription}</p>
                      <span className="link-arrow">View Story →</span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="section-cta">
              <Link to="/weddings" className="link-arrow">
                View All Weddings →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section services-preview">
        <div className="container">
          <Reveal>
            <p className="eyebrow">What We Do</p>
            <h2>Services</h2>
          </Reveal>
          <ul className="service-list">
            {homeServicePreview.map((name, i) => (
              <Reveal key={name} delay={i * 50}>
                <li>
                  <Link to="/services" className="service-row">
                    <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="service-name">{name}</span>
                    <span className="service-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link to="/services" className="link-arrow services-cta">
              Explore Our Services →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Kind Words</p>
            <h2>What couples say</h2>
          </Reveal>
          <div className="testimonials-grid">
            {testimonials.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <blockquote className="testimonial">
                  <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                  <footer>
                    <cite>{item.names}</cite>
                    <span>{item.title}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section build-feature">
        <div className="container build-feature-inner">
          <Reveal>
            <p className="eyebrow">Interactive Planning</p>
            <h2>Start with what you&apos;re imagining.</h2>
            <p className="lede">
              Select your celebration details, explore your options and get an estimated investment
              range for your wedding in Goa.
            </p>
            <Button to="/plan/build" variant="primary">
              Build Your Celebration →
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2>Frequently asked</h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <Reveal key={item.question} delay={i * 40}>
                <details className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <Reveal>
            <h2>Let&apos;s begin with your story.</h2>
            <div className="btn-group" style={{ marginTop: 'var(--space-6)' }}>
              <Button to="/plan/build" variant="primary">
                Build Your Celebration
              </Button>
              <Button to="/book" variant="secondary">
                Book a Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
