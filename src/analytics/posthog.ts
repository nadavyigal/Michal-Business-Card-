import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';
const APP_ENV = import.meta.env.MODE;
const APP_NAME = 'michal_business_card';

let initialized = false;

export function initPostHog(): boolean {
  if (initialized) return true;

  if (typeof window === 'undefined' || !POSTHOG_KEY) {
    return false;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: 'identified_only',
    persistence: 'localStorage+cookie',
    loaded: (client) => {
      client.register({
        app_name: APP_NAME,
        app_env: APP_ENV,
      });
    },
  });

  initialized = true;
  return true;
}

export function captureEvent(event: string, properties: Record<string, unknown> = {}): void {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function trackContactClick(channel: 'phone' | 'email', location: string): void {
  captureEvent('contact_clicked', {
    channel,
    location,
    page_name: APP_NAME,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function withBusinessCardUtm(url: string, content: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('utm_source', 'michal_business_card');
    parsed.searchParams.set('utm_medium', 'referral');
    parsed.searchParams.set('utm_campaign', 'unified_dashboard');
    parsed.searchParams.set('utm_content', content);
    return parsed.toString();
  } catch {
    return url;
  }
}

