import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './LandingPage';

console.log('🚀 Loading new course landing page: חזרה לזוגיות שבחרתי');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);


