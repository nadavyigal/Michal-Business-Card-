# PostHog Snippet For Website + Clinic Pages

Use the same PostHog project for:
- `https://www.michalslonim.com/` (property: `website`)
- `https://www.michalslonim.com/...קליניקה-לארגונים-1` (property: `clinic_for_organizations`)

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once reset group set_config register register_once unregister opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing isFeatureEnabled getFeatureFlag onFeatureFlags reloadFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init("VITE_OR_SITE_POSTHOG_KEY", {
    api_host: "https://us.i.posthog.com",
    capture_pageview: true,
    autocapture: true
  });

  const propertyName = window.location.pathname.includes("קליניקה") ? "clinic_for_organizations" : "website";

  posthog.capture("site_page_viewed", {
    property: propertyName,
    page_name: document.title,
    page_path: window.location.pathname,
    utm_source: new URLSearchParams(window.location.search).get("utm_source"),
    utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
    utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign")
  });

  document.querySelectorAll("form").forEach((form) => {
    let started = false;
    form.addEventListener("focusin", () => {
      if (started) return;
      started = true;
      posthog.capture("lead_form_started", { property: propertyName, page_path: window.location.pathname });
    });

    form.addEventListener("submit", () => {
      posthog.capture("lead_form_submitted", { property: propertyName, page_path: window.location.pathname });
    });
  });
</script>
```

This aligns events with `docs/analytics/unified-dashboard.md` so all properties appear in one dashboard.

