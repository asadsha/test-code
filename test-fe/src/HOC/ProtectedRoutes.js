import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../features/userAuthentication';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(isLoggedIn());
    }
  }, [isAuthenticated, dispatch]);

  if (isLoading) return 'loading';

  return isAuthenticated && !isLoading ? children : <Navigate to='/sign-in' />;
};
export default ProtectedRoutes;
