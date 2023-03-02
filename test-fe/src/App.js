import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { useLocation } from 'react-router-dom';
import RoutesPrimary from './RoutesPrimary';
import NavbarPrimary from './view/NavbarPrimary';

function App() {
  const { pathname } = useLocation();
  return (
    <main className='d-flex flex-column min-vh-100'>
      <NotificationContainer />
      {pathname !== '/sign-in' && pathname !== '/sign-up' ? (
        <NavbarPrimary />
      ) : (
        <div className='mt-5'></div>
      )}
      <div className='flex-fill'>
        <RoutesPrimary />
      </div>
    </main>
  );
}

export default App;
