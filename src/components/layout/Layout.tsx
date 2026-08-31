import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileTabBar } from './MobileTabBar';
import { RouteSeo } from '../seo/RouteSeo';

export function Layout() {
  const { pathname } = useLocation();
  const isAppFlow = pathname.startsWith('/plan') || pathname.startsWith('/book');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-app-flow', isAppFlow);
    return () => document.body.classList.remove('is-app-flow');
  }, [isAppFlow]);

  return (
    <>
      <RouteSeo />
      <Header />
      <main
        className={!isAppFlow ? 'has-mobile-tabs' : 'app-flow-main'}
        id="main-content"
      >
        <Outlet />
      </main>
      {!isAppFlow && <Footer />}
      {!isAppFlow && <MobileTabBar />}
    </>
  );
}
