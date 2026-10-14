# Safeway Verification Console (separate operator website)

Restricted admin site for verifying waterlogging reports across **all of Bangladesh**.
It is a **separate website** from the public app in `../client`, connected through
the **same backend API**.

## Run

```bash
npm install
npm run dev      # http://localhost:5174
```

The public app runs separately:

```bash
cd ../client
npm run dev      # http://localhost:5173
```

## How the two sites connect

| Concern | Wiring |
|---|---|
| Shared API | Both sites call `VITE_API_URL` (see `.env.example`). Admin login exchanges credentials for a `role=operator` JWT; public app uses `role=user`. |
| Auth | `POST /v1/auth/login` → HttpOnly JWT. Console routes require `role=operator`; backend rejects `role=user` on `/reports/verify`. |
| Verification flow | Console `Verify` → `POST /v1/reports/:id/verify` → map status updates → FCM push to nearby public-app users. `Discard` → `POST /v1/reports/:id/discard`. |
| CORS | Backend allow-lists both origins: the public app URL and this console URL. |
| No shared code | The console vendors its own copy of the design tokens. No imports from `../client`. |

## Cross-links

- Console header → “View main app” (`VITE_MAIN_SITE_URL`).
- Console login → “Open the Safeway app” for the public.
- The public app contains **zero** admin entry points by design.
