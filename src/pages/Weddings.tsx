import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { weddingFilters, weddings } from '../data/weddings';
import './Weddings.css';

export function Weddings() {
  const [filter, setFilter] = useState<(typeof weddingFilters)[number]>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return weddings;
    return weddings.filter((w) => w.tags.includes(filter));
  }, [filter]);

  return (
    <div className="page weddings-page">
      <header className="page-header container-wide">
        <p className="eyebrow">Portfolio</p>
        <h1>Our Weddings</h1>
        <p className="lede">
          Real celebrations across Goa — beachfront ceremonies, villa weekends and multi-day
          destination weddings.
        </p>
      </header>

      <div className="container-wide filter-bar" role="tablist" aria-label="Filter weddings">
        {weddingFilters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`filter-chip ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="container-wide wedding-portfolio">
        {filtered.map((wedding, i) => (
          <Reveal key={wedding.id} delay={(i % 3) * 60}>
            <article className={`portfolio-item ${i % 5 === 0 ? 'is-wide' : ''}`}>
              <Link to={`/weddings/${wedding.slug}`}>
                <div className="portfolio-image">
                  <img src={wedding.coverImage} alt={wedding.name} loading="lazy" />
                </div>
                <div className="portfolio-meta">
                  <h2>{wedding.name}</h2>
                  <p>
                    {wedding.location} · {wedding.days} Days · {wedding.guestCount} Guests
                  </p>
                  <span className="link-arrow">View Story →</span>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
