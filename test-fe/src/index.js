import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './app/store';
import App from './App';
import './styles/main.scss';
import 'react-notifications/lib/notifications.css';

const baseURL = 'http://localhost:9091/';

if (process.env.API) axios.defaults.baseURL = process.env.API;
else axios.defaults.baseURL = baseURL;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
