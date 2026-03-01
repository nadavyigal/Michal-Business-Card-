# Michal Unified Analytics Dashboard (PostHog)

## Goal
One dashboard that tracks performance across:
- `business_card` (this React page)
- `website` (`michalslonim.com`)
- `clinic_for_organizations` (`.../קליניקה-לארגונים-1`)

## Core Event Taxonomy
Use these events across all properties:

1. `business_card_page_viewed` or `site_page_viewed`
2. `section_viewed`
3. `scroll_depth_reached`
4. `contact_clicked`
5. `resource_link_clicked`
6. `lead_form_started`
7. `lead_form_submitted`

Required properties on all events:
- `property` (`business_card` | `website` | `clinic_for_organizations`)
- `page_name`
- `page_path`
- `utm_source`
- `utm_medium`
- `utm_campaign`

## Dashboard: `Michal - Unified Performance`
Create one PostHog dashboard with these insights:

1. `Visitors by Property (DAU/WAU/MAU)`
- Type: Trends
- Event: `business_card_page_viewed` + `site_page_viewed`
- Breakdown: `property`

2. `Traffic Source Mix`
- Type: Trends
- Event: `business_card_page_viewed` + `site_page_viewed`
- Breakdown: `utm_source`

3. `Business Card Engagement Funnel`
- Type: Funnel
- Steps:
  - `business_card_page_viewed`
  - `section_viewed` with `section_id = contact`
  - `contact_clicked` OR `resource_link_clicked`

4. `Resource Clicks by Destination`
- Type: Trends
- Event: `resource_link_clicked`
- Breakdown: `resource`

5. `Contact Intent by Channel`
- Type: Trends
- Event: `contact_clicked`
- Breakdown: `channel`

6. `Scroll Depth Distribution (Business Card)`
- Type: Trends
- Event: `scroll_depth_reached`
- Breakdown: `depth_percent`
- Filter: `property = business_card`

7. `Clinic Landing Performance`
- Type: Trends
- Event: `site_page_viewed`, `lead_form_started`, `lead_form_submitted`
- Filter: `property = clinic_for_organizations`

8. `Website to Course Conversion`
- Type: Funnel
- Steps:
  - `site_page_viewed` with `property = website`
  - `resource_link_clicked` with `resource = online_course`
  - `lead_form_submitted`

9. `Lead Submissions by Property`
- Type: Trends
- Event: `lead_form_submitted`
- Breakdown: `property`

10. `Top Pages by Conversion Intent`
- Type: Trends
- Events: `site_page_viewed`, `contact_clicked`, `resource_link_clicked`
- Breakdown: `page_path`

## Automatic Creation Script
This repo includes:
- `scripts/posthog/create-unified-dashboard.mjs`

Run it with:

```bash
npm run posthog:dashboard
```

The script auto-loads `.env.local` and `.env`.
If `POSTHOG_PROJECT_ID` contains a `phc_...` project key instead of a numeric id, the script resolves the numeric project id automatically via PostHog API.
Required env vars are listed in `.env.example`.

## Cross-Site Attribution
All business-card outbound links now append:
- `utm_source=michal_business_card`
- `utm_medium=referral`
- `utm_campaign=unified_dashboard`
- `utm_content=<destination>`

This lets one dashboard attribute website/clinic traffic back to the business card.
