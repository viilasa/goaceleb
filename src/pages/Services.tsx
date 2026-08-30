import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { services } from '../data/services';
import './Services.css';

export function Services() {
  return (
    <div className="page services-page">
      <header className="page-header container">
        <p className="eyebrow">Expertise</p>
        <h1>Services</h1>
        <p className="lede">
          Planning, design and hospitality — shaped around destination celebrations in Goa.
        </p>
      </header>

      <div className="services-editorial">
        {services.map((service, i) => (
          <Reveal key={service.id}>
            <section className={`service-section ${i % 2 === 1 ? 'is-alt' : ''}`}>
              <div className="container-wide service-layout">
                <div className="service-visual">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <div className="service-copy">
                  <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                  <h2>{service.title}</h2>
                  <p className="service-summary">{service.summary}</p>
                  <p>{service.description}</p>
                  <div className="service-actions">
                    <Link to="/plan/build" className="link-arrow">
                      Start Planning →
                    </Link>
                    <Link to="/book" className="link-arrow">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
