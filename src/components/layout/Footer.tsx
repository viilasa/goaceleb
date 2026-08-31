import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { SITE } from '../../config/site';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Goa Celebrations" width={200} height={34} />
          <p>{SITE.tagline}</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/services">Services</Link>
          <Link to="/plan/build">Build Your Celebration</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/book">Get in Touch</Link>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>{SITE.address.full}</p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
          <a href={`tel:${SITE.phoneSecondaryTel}`}>{SITE.phoneSecondary}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container-wide footer-bottom">
        <p>© {new Date().getFullYear()} Goa Celebrations</p>
        <p>
          Made by{' '}
          <a
            href="https://www.viilasa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit"
          >
            Viilasa
          </a>
        </p>
      </div>
    </footer>
  );
}
