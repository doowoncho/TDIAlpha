import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import NavBar from './Components/NavBar';
import { registerLicense } from '@syncfusion/ej2-base';

const root = ReactDOM.createRoot(document.getElementById('root'));
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtedXZWR2ldUUFxW0U=');
root.render(
  <React.StrictMode>
    <NavBar></NavBar>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);
