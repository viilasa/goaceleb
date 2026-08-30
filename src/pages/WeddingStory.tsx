import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { getWeddingBySlug } from '../data/weddings';
import './WeddingStory.css';

export function WeddingStory() {
  const { slug } = useParams();
  const wedding = getWeddingBySlug(slug || '');

  if (!wedding) {
    return (
      <div className="page container" style={{ paddingBlock: '6rem' }}>
        <h1>Wedding not found</h1>
        <p className="lede" style={{ marginTop: '1rem' }}>
          This story may have moved.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Button to="/weddings" variant="primary">
            Back to Weddings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="page wedding-story">
      <div className="story-cover">
        <img src={wedding.coverImage} alt={wedding.name} />
      </div>

      <header className="story-header container">
        <p className="eyebrow">Wedding Story</p>
        <h1>{wedding.name}</h1>
        <p className="story-meta">
          {wedding.location} · {wedding.days} Days · {wedding.guestCount} Guests
        </p>
        <p className="lede">{wedding.introduction}</p>
      </header>

      <div className="container story-body">
        <Reveal>
          <section className="story-block">
            <div className="story-image">
              <img src={wedding.gallery[0]} alt="" loading="lazy" />
            </div>
            <div>
              <h2>Wedding Details</h2>
              <p>{wedding.details}</p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="story-block reverse">
            <div className="story-image">
              <img src={wedding.gallery[1] || wedding.gallery[0]} alt="" loading="lazy" />
            </div>
            <div>
              <h2>Décor Moments</h2>
              <p>{wedding.decorMoments}</p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="story-block">
            <div className="story-image">
              <img src={wedding.gallery[2] || wedding.gallery[0]} alt="" loading="lazy" />
            </div>
            <div>
              <h2>Guest Experience</h2>
              <p>{wedding.guestExperience}</p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="story-gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {wedding.gallery.map((src, i) => (
                <div key={src} className={`gallery-item ${i === 0 ? 'span-2' : ''}`}>
                  <img src={src} alt={`${wedding.name} moment ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      <section className="section story-cta">
        <div className="container">
          <h2>Planning something similar?</h2>
          <Link to="/plan/build" className="link-arrow" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            Start Building Your Celebration →
          </Link>
        </div>
      </section>
    </article>
  );
}
