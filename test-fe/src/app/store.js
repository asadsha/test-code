import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userAuthentication';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
