import { Link, useLocation } from 'react-router-dom';
import './MobileCTA.css';

const HIDDEN_ON = ['/plan/build', '/book'];

export function MobileCTA() {
  const { pathname } = useLocation();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="mobile-sticky-cta">
      <Link to="/plan/build">Start Planning</Link>
    </div>
  );
}
