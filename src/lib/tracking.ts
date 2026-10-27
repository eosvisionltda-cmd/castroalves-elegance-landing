type AnalyticsWindow = Window & { dataLayer?: Record<string, unknown>[] };
// Events contain no name, phone, email, address or free-text form answers.
// GTM/GA4 tags and their consent rules must be configured before publication.
export function trackEvent(event: string, details: Record<string, string> = {}) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({ event, page_path: window.location.pathname, ...details });
}
