import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileCTA } from './MobileCTA';
import { RouteSeo } from '../seo/RouteSeo';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const hideSticky = pathname.startsWith('/plan') || pathname.startsWith('/book');

  return (
    <>
      <RouteSeo />
      <Header />
      <main className={!hideSticky ? 'has-mobile-cta' : undefined} id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
