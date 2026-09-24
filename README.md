# Bedia Pottery

Storefront for Bedia Pottery, a premium ceramic studio in Dubai. Covers the
marketing site, workshop browsing and booking, cart and checkout, gift-card
purchase and redemption, and post-purchase order tracking.

The frontend holds no database of its own — it renders and posts to an external
REST API.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 18, TypeScript 5 (`strict`) |
| Styling | Tailwind CSS 3, Radix UI primitives (shadcn "new-york" preset) |
| State | Zustand 5 with `persist` |
| Animation | Framer Motion, Swiper |
| Forms | `react-phone-number-input`, `react-day-picker`, `date-fns` |
| Icons | `lucide-react` |
| HTTP | `fetch` for most services, `axios` in `authService` |

## Getting started

Requires Node.js 18+.

```bash
npm install
```

Create `.env.local` with the API origin:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api-bediaprive.adpedia.in
```

Most services call `assertApiBaseUrl()` and throw a clear error if this is
missing, so a blank value fails loudly rather than silently returning no data.
`authService.ts` is the exception — it falls back to `""`, which turns its
requests into same-origin relative URLs instead of failing outright.

```bash
npm run dev     # development server on :3000
npm run build   # production build
npm run start   # serve the production build (requires `build` first)
npm run lint    # currently broken - see Known gaps
```

`build` raises the Node heap to 4 GB via `cross-env` — the workshop pages pull
large image payloads at build time.

## Project structure

```
app/                      routes (App Router); pages stay thin and delegate
  workshops/[category]/[slug]/   workshop detail
  cart/  checkout/  success/  failure/
  redeem/  tracking-order/
  login/  signup/  forgot-password/  reset-password/
  about/  faq/  terms/  privacy/  cancellation/
components/               grouped by domain, not by type
  cart/ product/ giftcard/ birthday/ kids-birthday/
  form/ layout/ sections/ testimonial/ tracking/ faq/ common/
  ui/                     shared primitives (Button, Title, accordion, calendar…)
services/                 one module per API area; typed fetch wrappers
store/                    Zustand stores (auth, guest cart)
utils/                    guestCart, validation, sanitizeHtml
constants/                static copy and config
types/                    shared TypeScript interfaces
hooks/  lib/              small shared helpers
```

### Data flow

```
app/**/page.tsx  →  *PageClient / domain component  →  services/*.service.ts  →  REST API
```

Route files resolve params and metadata, then hand off to a client component.
Components never build URLs or set auth headers themselves — that belongs in
`services/`.

## State

Two persisted Zustand stores:

- **`store/authStore.ts`** — signed-in user and JWT, persisted under
  `auth-storage`. `useAuthStore.getState().user?.token` is how services read the
  token.
- **`store/guestCartStore.ts`** — cart for visitors who are not signed in, so
  browsing and adding to cart never requires an account.

`utils/guestCart.ts` bridges the two:

- `addToCartOrGuest()` routes an item to the guest store or the server cart
  depending on auth state, and guards against double-submits.
- `guestCartToCartData()` reshapes guest items into the server's `CartData`
  shape so the cart and checkout UI render from one type.
- `syncGuestCartToServer()` runs on login and merges the guest cart into the
  account, skipping anything already present.

An item counts as a duplicate on **workshop + date + start time + end time**.
Gift items are exempt — several of the same gift are legitimate.

The guest cart is restored from `localStorage` **after** the first render, so
`items` is briefly empty on load. Never decide a cart is empty from that first
value — gate on `hooks/useGuestCartHydrated.ts`, as the cart and checkout
screens do, or a guest is told their cart is empty when it is not.

## Booking flow

```
workshop detail  →  add to cart  →  /cart  →  /checkout  →  payment gateway  →  /success?orderId=…
```

`/checkout` is a three-step flow in `components/cart/CheckoutFlow.tsx`
(cart review → billing → complete). The current step is mirrored into
`localStorage` under `checkoutCartStep` so a refresh mid-checkout does not drop
the customer back to step one.

On submit, `BookingService.bookNow()` posts the booking and the response carries
a hosted-payment `checkoutUrl` that the browser is redirected to. The gateway
returns the customer to `/success` or `/failure`.

## API surface

All paths are relative to `NEXT_PUBLIC_API_BASE_URL`.

| Area | Endpoints |
|---|---|
| Auth | `POST /auth/login`, `POST /auth/register`, `POST /user/forgot-password`, `POST /user/reset-password` |
| Workshops | `GET /workshop/homepage`, `GET /workshop/bySlug/:slug`, `GET /workshop/byCategory?slug=` |
| Availability | `POST /workshop/pottery-availability`, `POST /workshop/pottery-capacity` |
| Cart | `GET /workshop/cart/:userId`, `POST /workshop/cart`, `DELETE /workshop/cart/item` |
| Booking | `POST /workshop/pottery-booking`, `GET /workshop/order/:orderId` |
| Gift cards | `GET /workshop/redeem/validate/:bookingId`, `POST /workshop/redeem/confirm` |
| Tracking | `GET /workshop/tracking/:trackingId` |
| Content | `GET /faq/all`, `GET /terms-and-conditions/all`, `GET /reviews/all`, `GET /opening-hours/all` |

Services read `result` or `data` off the response envelope depending on the
endpoint, and throw an `Error` carrying the status and body when a call fails.
Content requests use `cache: "no-store"` so the CMS is always authoritative.

## Rendering CMS HTML

Several fields arrive from the CMS as HTML (FAQ answers, workshop and clay
descriptions). These render through `utils/sanitizeHtml.ts` before reaching
`dangerouslySetInnerHTML`:

```tsx
import { sanitizeHtml } from '@/utils/sanitizeHtml'

<span dangerouslySetInnerHTML={{ __html: sanitizeHtml(answer) }} />
```

The sanitizer is allowlist-based and dependency-free. It keeps ordinary
formatting tags, drops `<script>`/`<iframe>`/`<form>` and their contents, strips
`on*` handlers and `style`, rejects `javascript:` and `data:` URLs (including
entity- and whitespace-obfuscated variants), and forces
`rel="noopener noreferrer"` onto any `target` link.

**Never pass CMS HTML to `dangerouslySetInnerHTML` without it.** It is written
for admin-authored content; if user-submitted HTML is ever rendered, move to a
vetted library such as DOMPurify.

## Cart totals

`utils/cartTotals.ts` is the single source of truth for cart money. The API is
authoritative — a booking amount is calculated server-side and that is what the
payment gateway charges — so the cart and checkout screens display the server's
`taxAmount` / `grandTotal` rather than recomputing them.

```ts
const { subtotal, taxAmount, grandTotal } = getCartTotals(data?.[0])
```

It falls back to `DEFAULT_VAT_RATE` (5%) only when the API has supplied no tax,
which is the guest-cart case. Do not reintroduce a hardcoded rate in a
component; change `DEFAULT_VAT_RATE` or let the server drive it.

## Theme

Configured in `tailwind.config.ts`, not hardcoded per component:

- `primary` `#0D463D` (dark green), with `primary-dark` and `primary-light`
- `secondary` `#E5E0C9`, plus `secondary-off` and `secondary-dark`
- `darkblack` `#333333`

Fonts are self-hosted from `public/fonts` and exposed as CSS variables by
`app/layout.tsx`: Euclid Circular A (`font-sans`, the default), Neiko
(`font-neiko`) and Sunrise Himalaya. Shared utilities such as `.page-wrapper`,
`.btn-primary` and `.section-padding` live in `app/globals.css`.

Use the tokens (`bg-primary`, `text-primary`) rather than raw hex so a palette
change stays in one file.

## Conventions

- Path alias `@/*` maps to the project root.
- Source files use **CRLF** line endings — keep editors from rewriting them, or
  diffs fill with phantom changes.
- Server Components by default; add `"use client"` only where state, effects or
  browser APIs are needed.
- Keep API calls in `services/`, shared shapes in `types/`, static copy in
  `constants/`.
- `console.error` is fine for genuine failures. Do not log API responses —
  order, cart and tracking payloads contain customer personal data.

## Known gaps

Worth knowing before extending the checkout or auth code:

- **The JWT lives in `localStorage`** via Zustand `persist`, so it is readable
  by any script on the page. Moving to an httpOnly cookie needs backend support.
- **No route protection.** There is no middleware; `/checkout` is reachable
  while signed out, where the booking payload carries an undefined `userId`.
- **`npm run lint` does not run.** The script calls `next lint`, which was
  removed in Next.js 16, so it fails with "Invalid project directory ... /lint".
  Linting needs the ESLint CLI and a config; neither is set up yet.
- **No test suite and no CI.**

## License

© 2024 Bedia Pottery LLC
