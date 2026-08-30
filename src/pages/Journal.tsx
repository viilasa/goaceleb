import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { journalArticles } from '../data/journal';
import './Journal.css';

export function Journal() {
  return (
    <div className="page journal-page">
      <header className="page-header container">
        <p className="eyebrow">Guides & Notes</p>
        <h1>Journal</h1>
        <p className="lede">
          Practical guidance for planning a destination wedding in Goa — budgets, seasons, venues
          and multi-day celebrations.
        </p>
      </header>

      <div className="container journal-list">
        {journalArticles.map((article, i) => (
          <Reveal key={article.id} delay={i * 50}>
            <article className="journal-item">
              <Link to={`/journal/${article.slug}`}>
                <div className="journal-image">
                  <img src={article.coverImage} alt="" loading="lazy" />
                </div>
                <div className="journal-meta">
                  <p className="eyebrow">
                    {article.category} · {article.readTime}
                  </p>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <span className="link-arrow">Read →</span>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
