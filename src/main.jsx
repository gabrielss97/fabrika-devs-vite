// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Router
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App';

// Styles
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
