import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Header.css';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/plan/build', label: 'Plan Your Wedding' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Blogs' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`site-header ${scrolled || !isHome || open ? 'is-solid' : ''} ${isHome && !scrolled && !open ? 'is-over-hero' : ''}`}
    >
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Goa Celebrations home">
          <img src={logo} alt="Goa Celebrations" className="brand-logo" width={180} height={31} />
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/book" className="nav-cta">
            Book a Consultation
          </Link>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="mobile-link">
              {link.label}
            </NavLink>
          ))}
          <Link to="/book" className="mobile-cta">
            Book a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
