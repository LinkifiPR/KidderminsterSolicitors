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

Required Kit environment variables:

```bash
KIT_API_KEY=
KIT_FORM_ID=9391183
```

## Partner Lead Email Notification

Lead notification email is sent server-side after a lead has been validated and
submitted to Kit.

Required email environment variables:

```bash
RESEND_API_KEY=
PARTNER_LEAD_EMAIL=chrispanteli@gmail.com
LEAD_NOTIFICATION_FROM="Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>"
```

Optional internal copy:

```bash
ADMIN_LEAD_EMAIL=chrispanteli@gmail.com
```

Optional separate sender for public user confirmation emails:

```bash
LEAD_CONFIRMATION_FROM="Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>"
```

The form submits to `/api/leads`, which:

- creates or updates the Kit subscriber
- creates/reuses routing tags
- applies website, town, and category tags
- sends the validated lead details to `PARTNER_LEAD_EMAIL`
- sends a Resend confirmation email to the submitted user email address

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

Set Kit automations to trigger from tags only when they are internal/admin
workflows. Do not use Kit to send public-facing quote enquiry confirmations.
Partner lead delivery and user confirmation are handled by server-side Resend
email in `/api/leads`.
