import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './LandingPage';
import MichalProPage from './MichalProPage';

console.log('🚀 Loading Michal Pro Page');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MichalProPage />
    {/* <LandingPage /> */}
  </React.StrictMode>
);


