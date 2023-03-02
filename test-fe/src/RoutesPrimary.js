import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './HOC/ProtectedRoutes';
import SignInPage from './view/auth/SignInPage';
import SignUpPage from './view/auth/SignUpPage';
import HomePage from './view/Dashboard';

const RoutesPrimary = () => {
  return (
    <Routes>
      <Route exact path='/sign-in' element={<SignInPage />} />
      <Route exact path='/sign-up' element={<SignUpPage />} />
      <Route
        exact
        path='/'
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default RoutesPrimary;
