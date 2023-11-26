import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='App'>
      <Navbar />
      <div className={`${path === '/' ? '' : 'my-5 py-3'} content`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
