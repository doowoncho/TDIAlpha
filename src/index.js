import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import MyNavBar from './components/MyNavBar';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyNavBar/>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);
