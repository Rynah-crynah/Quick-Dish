import './index.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
);

