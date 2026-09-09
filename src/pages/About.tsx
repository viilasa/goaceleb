import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SITE } from '../config/site';
import { aboutContent, milestones } from '../data/brand';
import './About.css';

export function About() {
  return (
    <div className="page about-page">
      <header className="page-header container-wide">
        <p className="eyebrow">Our Studio</p>
        <h1>About Goa Celebrations</h1>
        <p className="lede">{aboutContent.headline}</p>
      </header>

      <div className="about-visual container-wide">
        <img
          src="https://res.cloudinary.com/ddhhlkyut/image/upload/v1788958066/blog_a65b3490-484c-4a62-80d6-07410256fba3_hgswge.webp"
          alt="Sunset beach in Goa"
          loading="lazy"
        />
      </div>

      <section className="section container about-copy">
        <Reveal>
          <h2>A destination wedding planner in Goa.</h2>
          {aboutContent.story.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="section about-values">
        <div className="container values-grid">
          {[
            {
              title: 'Mission',
              text: aboutContent.mission,
            },
            {
              title: 'Vision',
              text: aboutContent.vision,
            },
            {
              title: 'Local fluency',
              text: 'Deep knowledge of Goa venues, seasons, permissions and hospitality partners — from Ashvem and Mandrem to resorts across the coast.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container about-milestones">
        <Reveal>
          <p className="eyebrow">Milestones</p>
          <h2>A decade of celebrations.</h2>
        </Reveal>
        <ol className="milestone-list">
          {milestones.map((item, i) => (
            <Reveal key={item.date} delay={i * 80}>
              <li>
                <span className="milestone-date">{item.date}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="about-stats">
          {SITE.claims.yearsExperience} years of experience · {SITE.claims.eventsManaged} events
          managed
        </p>
      </section>

      <section className="section container">
        <Reveal>
          <h2>Ready when you are.</h2>
          <p className="lede" style={{ marginTop: 'var(--space-3)' }}>
            Visit us at {SITE.address.full}, or start a conversation online.
          </p>
          <div className="btn-group" style={{ marginTop: 'var(--space-5)' }}>
            <Button to="/plan/build" variant="primary">
              Build Your Celebration
            </Button>
            <Button to="/book" variant="secondary">
              Book a Consultation
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
