import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import MyNavBar from './components/MyNavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyNavBar/>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);
