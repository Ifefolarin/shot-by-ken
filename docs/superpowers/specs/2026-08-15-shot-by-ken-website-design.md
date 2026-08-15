# Shot by Ken — One-Page Photography Website
**Spec date:** 2026-08-15  
**Status:** Approved for implementation  

---

## 1. Project Overview

A one-page marketing and booking website for **Shot by Ken**, a high-end photography brand. The site exists to showcase work, communicate pricing, and capture booking leads via a contact form.

**Design system:** `Client-projects/DESIGN.md` (Luxury Minimalist — EB Garamond + DM Sans, Deep Charcoal + Soft Warm White palette, 0px border radius throughout).

**Project folder:** `Client-projects/shot-by-ken/`

---

## 2. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | API routes, Server Components, `next/image`, Vercel-native |
| Styling | Tailwind CSS + CSS variables | DESIGN.md tokens map directly to CSS vars |
| Language | TypeScript (strict) | Type safety on API contract + form schema |
| Email | Resend | First-class Vercel support, 3k free emails/month, reliable deliverability |
| Icons | react-icons (si + lu sets) | SiInstagram, SiTiktok; Lucide for UI chrome |
| Validation | Zod | Schema-first, pairs with TypeScript, good error messages |
| Deployment | Vercel | Zero-config Next.js, automatic HTTPS, edge network |

---

## 3. Page Sections (top → bottom)

1. **Nav** — sticky, transparent-to-white on scroll, logo left, anchor links right, social icons far right
2. **Hero** — full-bleed photography, EB Garamond display headline, DM Sans subheading tagline, single CTA
3. **Portfolio** — masonry/justified grid, skeleton loaders on reveal, lazy load via IntersectionObserver
4. **Services & Pricing** — 3–4 service cards, pricing tiers, book CTA per card
5. **Contact / Book a Session** — booking form (see field spec below)
6. **Footer** — logo, social icons (Instagram + TikTok), phone, email, copyright

---

## 4. Contact Form Field Spec

| Field | Input type | Validation | Max length | Required |
|---|---|---|---|---|
| Full name | text | Non-empty string | 100 | Yes |
| Email address | email | RFC 5322 via Zod `.email()` | 254 | Yes |
| Phone number | tel | Optional, digits/spaces/+/- only | 20 | No |
| Service type | select | enum: portrait / event / editorial / other | — | Yes |
| Message | textarea | Non-empty string | 2,000 | Yes |
| How did you hear about us | select | enum: google / instagram / referral / other | — | Yes |

All string fields: `.trim()` + HTML-strip (strip `<>` and entities) before touching Resend.

---

## 5. API Route — `/api/contact` (POST)

```
Request  → { name, email, phone?, service, message, source }
Response → 200 { success: true }
           400 { error: string, fields?: Record<string, string> }
           429 { error: "Too many requests. Please try again in 15 minutes." }
           500 { error: "Something went wrong. Please try again later." }
```

**Processing order:**
1. Extract IP from `x-forwarded-for` (Vercel sets this)
2. Rate limiter check → 429 if ≥ 5 requests in 15-min sliding window
3. Zod validation → 400 with field errors if any field fails
4. Sanitize all string fields (trim, strip HTML)
5. Send form email via Resend → `shottbykenneth@gmail.com`
6. Return 200
7. On any unhandled error: `captureError()` → Resend alert → `ifefolarin1@gmail.com`, then return 500

---

## 6. Rate Limiting

**Algorithm:** Sliding window per IP, in-memory `Map<string, number[]>`.

```
const WINDOW_MS = 15 * 60 * 1000   // 15 minutes
const MAX_REQUESTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = store.get(ip) ?? []
  const recent = timestamps.filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) return false
  store.set(ip, [...recent, now])
  return true
}
```

**Note:** In-memory — resets on Vercel cold start. Appropriate for a contact form; not suitable for auth endpoints. If auth is added later, upgrade to Upstash Redis.

---

## 7. Error Tracking

`lib/errors.ts` exports `captureError(error: Error, context?: Record<string, unknown>)`:

```typescript
export async function captureError(error: Error, context?: Record<string, unknown>) {
  await resend.emails.send({
    from: 'alerts@shottbyken.com',   // or Resend's onboarding domain during dev
    to: process.env.ALERT_EMAIL!,    // ifefolarin1@gmail.com
    subject: `[Shot by Ken] Site error: ${error.message}`,
    html: `<pre>${JSON.stringify({ message: error.message, stack: error.stack, context }, null, 2)}</pre>`
  })
}
```

Called in the `/api/contact` catch block and in `app/global-error.tsx` (Next.js app-level error boundary).

---

## 8. Security

### Headers (`next.config.ts`)
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://api.resend.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Environment variables
`.env.local` (gitignored):
```
RESEND_API_KEY=re_...
CONTACT_EMAIL=shottbykenneth@gmail.com
ALERT_EMAIL=ifefolarin1@gmail.com
NEXT_PUBLIC_PHONE=+14372278884
NEXT_PUBLIC_INSTAGRAM_URL=#
NEXT_PUBLIC_TIKTOK_URL=#
```

`.env.example` (committed — placeholder values only):
```
RESEND_API_KEY=re_YOUR_KEY_HERE
CONTACT_EMAIL=client@example.com
ALERT_EMAIL=your@email.com
NEXT_PUBLIC_PHONE=+10000000000
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@yourhandle
```

### Security scan (pre-commit)
```bash
grep -rn "re_\|sk_\|api_key\|password\|secret\|token" \
  --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir=".next" --exclude-dir="node_modules" .
```
Any hit = build fails.

---

## 9. Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Skip nav | First DOM element: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>` |
| Landmarks | `<header>`, `<main id="main-content">`, `<nav aria-label="Main">`, `<footer>`, `<section aria-labelledby="section-id">` |
| Focus ring | `outline: 2px solid #1a1a1a; outline-offset: 2px` on all interactive elements |
| Form errors | `aria-invalid="true"` + `aria-describedby="field-error"` on invalid inputs |
| Images | `alt` required on all `<Image>`; decorative images get `alt=""` |
| Color contrast | `#1a1a1a` on `#fbf9f9` = 17.5:1 (AAA) |
| Social icons | `aria-label="Follow Shot by Ken on Instagram"` on icon-only links |
| Motion | `@media (prefers-reduced-motion: reduce)` disables shimmer animation and scroll transitions |
| Viewport | No `user-scalable=no` |

---

## 10. Skeleton Loaders

Only the Portfolio grid uses skeleton loaders (other sections are server-rendered, no async data):

- Initial render: 6 `<PortfolioSkeleton>` cards with CSS shimmer (`animate-pulse`, Champagne `#d4cbb3` → Warm White `#fbf9f9` gradient)
- `useIntersectionObserver` fires when grid enters viewport
- Real images replace skeletons with 200ms opacity fade
- `prefers-reduced-motion`: skip fade, replace skeletons immediately

---

## 11. Custom 404

`app/not-found.tsx` — matches the site aesthetic:
- Same header/footer as main page
- Large EB Garamond "404" as display text
- One-line DM Sans message: "This page doesn't exist — but great work lives here."
- CTA button back to `/`

---

## 12. Client Contact Details

| Detail | Value |
|---|---|
| Ken's phone | +1 (437) 227 8884 |
| Ken's email | shottbykenneth@gmail.com |
| Instagram | TBD — ask before launch |
| TikTok | TBD — ask before launch |

---

## 13. Out of Scope

- CMS / admin panel (images managed via `public/images/` for now)
- Authentication / user accounts
- Payment processing
- Blog / editorial pages
- Analytics (can add Vercel Analytics post-launch with zero code)

---

## 14. Success Criteria

- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] Contact form delivers to `shottbykenneth@gmail.com` within 30 seconds
- [ ] 6th form attempt within 15 minutes returns 429
- [ ] All secrets in `.env.local` — zero secrets in committed code (grep scan passes)
- [ ] All WCAG 2.1 AA checkpoints pass (axe DevTools)
- [ ] Custom 404 renders correctly
- [ ] Site renders correctly at 375px (mobile) and 1440px (desktop)
