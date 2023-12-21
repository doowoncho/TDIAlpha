import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MyNavBar from './components/MyNavBar';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
const client = generateClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyNavBar/>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);
