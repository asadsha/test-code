import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const userAuthSlice = createSlice({
  name: 'User',
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: '',
  },
  reducers: {
    loginUser: (state, action) => {
      const user = jwt.decode(action.payload);
      state.user = user;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('token', action.payload);
      setAuthorizationToken(action.payload);
    },
    isLoggedIn: (state) => {
      const payload = localStorage.getItem('token');
      if (payload !== null) {
        const user = jwt.decode(payload);
        setAuthorizationToken(payload);
        state.user = user;
        state.token = payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      } else {
        state.isLoading = false;
      }
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      delete axios.defaults.headers.common['Authorization'];
      state.user = null;
      state.token = '';
    },
  },
});

export const { loginUser, isLoggedIn, logout } = userAuthSlice.actions;

export const User = (state) => state.user;

export default userAuthSlice.reducer;

// if (authHeader) {
//   const token = authHeader.split(' ')[1];
//   if (token) {
//     jwt.verify(token, process.env.JwtSecret, (err, user) => {
//       if (err) {
//         res.status(400);
//         next(new Error('Token Exoired'));
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     next();
//   }
// } else {
//   next();
// }
