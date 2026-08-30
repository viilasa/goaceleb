import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Goa Celebrations" width={200} height={34} />
          <p>Bespoke destination weddings and celebrations in Goa.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/weddings">Our Weddings</Link>
          <Link to="/services">Services</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/plan/build">Build Your Celebration</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/book">Get in Touch</Link>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>Goa, India</p>
          <a href="mailto:hello@goacelebrations.com">hello@goacelebrations.com</a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container-wide footer-bottom">
        <p>© {new Date().getFullYear()} Goa Celebrations</p>
        <p>Designed for celebrations that feel timeless.</p>
      </div>
    </footer>
  );
}
