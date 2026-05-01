# Kidderminster Solicitors

Static-first Next.js website for an informational Kidderminster solicitors quote project.

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm test
npm run build
```

## Netlify

Connect the GitHub repository in Netlify and use:

- Build command: `npm run build`
- Publish directory: `.next`

Netlify automatically applies its current Next.js adapter for modern Next.js projects.

## Kit Lead Capture

The website uses custom-designed frontend forms. Do not embed Kit forms visually.

Required environment variables:

```bash
KIT_API_KEY=
KIT_FORM_ID=9391183
```

The form submits to `/api/leads`, which:

- creates or updates the Kit subscriber
- adds the subscriber to Kit form `9391183`
- creates/reuses routing tags
- applies website, town, and category tags

Kit tags currently created by the integration:

- `Lead - Website`
- `Town - Kidderminster`
- `Category - Conveyancing`
- `Category - Probate`
- `Category - Family Law`
- `Category - Divorce`
- `Category - Wills`
- `Category - Employment`
- `Category - Personal Injury`
- `Category - Commercial`
- `Category - Landlord Tenant`

Set Kit automations to trigger from either the quote request form or the category tags. Use those automations for user confirmation, internal admin notification, assigned partner notification, and any reporting sheet integration.
