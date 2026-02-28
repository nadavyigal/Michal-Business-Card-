import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './LandingPage';
import MichalProPage from './MichalProPage';
import { initPostHog } from './analytics/posthog';

console.log('🚀 Loading Michal Pro Page');
const posthogEnabled = initPostHog();
console.log(posthogEnabled ? '📊 PostHog analytics enabled' : '📊 PostHog analytics disabled (missing VITE_POSTHOG_KEY)');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MichalProPage />
    {/* <LandingPage /> */}
  </React.StrictMode>
);


