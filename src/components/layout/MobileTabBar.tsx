import { NavLink } from 'react-router-dom';
import './MobileTabBar.css';

const tabs = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/plan/build', label: 'Plan', accent: true },
  { to: '/blogs', label: 'Blogs' },
  { to: '/book', label: 'Contact' },
];

export function MobileTabBar() {
  return (
    <nav className="mobile-tab-bar" aria-label="Primary mobile">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `tab-item ${isActive ? 'is-active' : ''} ${tab.accent ? 'is-accent' : ''}`
          }
        >
          <span className="tab-icon" aria-hidden>
            {tab.to === '/' && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
              </svg>
            )}
            {tab.to === '/services' && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="4" y="4" width="7" height="7" rx="1" />
                <rect x="13" y="4" width="7" height="7" rx="1" />
                <rect x="4" y="13" width="7" height="7" rx="1" />
                <rect x="13" y="13" width="7" height="7" rx="1" />
              </svg>
            )}
            {tab.to === '/plan/build' && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 5v14M5 12h14" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            )}
            {tab.to === '/blogs' && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5h14v14H5z" />
                <path d="M8 9h8M8 12h8M8 15h5" />
              </svg>
            )}
            {tab.to === '/book' && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8a6 6 0 0 1 12 0c0 4-6 10-6 10S6 12 6 8Z" />
                <circle cx="12" cy="8" r="2" />
              </svg>
            )}
          </span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
