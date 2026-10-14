# SafePath — Bangladesh-wide waterlogging safety

Two websites, one backend API. No demo accounts, no hardcoded personal data.

## Sites

| Site | Folder | Dev | Serves |
|---|---|---|---|
| Public app (nationwide) | `client/` | `npm run dev` → :5173 | Map, routing, reporting, verification tracking, settings |
| Verification console (restricted operators) | `admin/` | `npm run dev` → :5174 | Login, nationwide review queue, ops log |

The public app has **zero admin entry points** by design. See `admin/README.md`
for the connection contract (shared `VITE_API_URL`, `role=operator` JWT, CORS
allow-list, FCM fan-out).

## Coverage

Nationwide across all 8 divisions of Bangladesh (Dhaka, Chattogram, Sylhet,
Khulna, Rajshahi, Barishal, Rangpur, Mymensingh). The map centers on the
user's live location with a country fallback — never locked to one neighbourhood.
Mock data in `client/src/data/mockData.js` is location-neutral sample geometry
plus real division names; swap it for API responses without touching components.

## Live map (no demo pins)

- **Dashboard / Report**: browser Geolocation centers the map; nationwide
report markers render at real division coordinates. Falls back to a
country-wide Bangladesh view when permission is denied.
- **Navigate**: addresses are geocoded live (OpenStreetMap Nominatim,
Bangladesh-biased) with suggestion dropdowns, and road geometry comes from
the OSRM router — the map moves to whatever address is typed.
- Waterlogging safety colors (Green ×1 / Yellow ×1.5–×5 / Red ×∞) light up
once `POST /v1/map/route` is connected; until then the UI labels the live
route honestly instead of painting sample colors on it.
