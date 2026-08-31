import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import './About.css';

export function About() {
  return (
    <div className="page about-page">
      <header className="page-header container-wide">
        <p className="eyebrow">Our Studio</p>
        <h1>About Goa Celebrations</h1>
        <p className="lede">
          A premium destination wedding and event planning brand based in Goa — known for calm
          process, refined design and celebrations that feel personal.
        </p>
      </header>

      <div className="about-visual container-wide">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
          alt="Goa coastline"
          loading="lazy"
        />
      </div>

      <section className="section container about-copy">
        <Reveal>
          <h2>We plan with intention.</h2>
          <p>
            Goa Celebrations was founded for couples who want their destination wedding to feel
            considered — not crowded with clichés. We bring together planning, design and hospitality
            so every detail supports the story you want to tell.
          </p>
          <p>
            Whether you are planning from another city, another country, or already know your venue,
            we guide you with clarity: timelines that make sense, design that feels timeless, and a
            guest experience that feels cared for.
          </p>
        </Reveal>
      </section>

      <section className="section about-values">
        <div className="container values-grid">
          {[
            {
              title: 'Editorial design',
              text: 'Visual direction that photographs beautifully and feels lived-in, not overdone.',
            },
            {
              title: 'Calm coordination',
              text: 'A process designed to reduce overwhelm — for you and for your guests.',
            },
            {
              title: 'Local fluency',
              text: 'Deep knowledge of Goa venues, seasons, permissions and hospitality partners.',
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

      <section className="section container">
        <Reveal>
          <h2>Ready when you are.</h2>
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
