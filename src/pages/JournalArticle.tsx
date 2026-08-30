import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { getArticleBySlug } from '../data/journal';
import './JournalArticle.css';

export function JournalArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="page container" style={{ paddingBlock: '6rem' }}>
        <h1>Article not found</h1>
        <Button to="/journal" variant="primary" style={{ marginTop: '2rem' }}>
          Back to Journal
        </Button>
      </div>
    );
  }

  const dateLabel = new Date(article.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="page journal-article">
      <header className="article-header container-narrow">
        <p className="eyebrow">
          {article.category} · {article.readTime} · {dateLabel}
        </p>
        <h1>{article.title}</h1>
        <p className="lede">{article.excerpt}</p>
      </header>

      <div className="article-cover container-wide">
        <img src={article.coverImage} alt="" />
      </div>

      <div className="container-narrow article-body">
        {article.content.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>

      <footer className="article-footer container-narrow">
        <Link to="/journal" className="link-arrow">
          ← All articles
        </Link>
        <div className="article-cta">
          <h2>Ready to plan yours?</h2>
          <Button to="/plan/build" variant="primary">
            Build Your Celebration
          </Button>
        </div>
      </footer>
    </article>
  );
}
