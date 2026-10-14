// Mocked UI data for the routing docs (flowchart plus algorithm).
// Sample rows are labeled Sample in the UI until the API connects.

// Fallback map centre when geolocation is unavailable (centre of Bangladesh).
export const COUNTRY_FALLBACK = { lat: 23.685, lng: 90.3563, label: "Bangladesh" };

export const COVERAGE_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

export const ROUTE_OPTIONS = [
  {
    id: "safe-a",
    tone: "safe",
    // green sample polyline near the fallback position (landing preview only)
    path: [
      [23.8103, 90.4125],
      [23.8155, 90.418],
      [23.822, 90.425],
      [23.83, 90.43],
      [23.8375, 90.428],
    ],
  },
  {
    id: "alt-b",
    tone: "caution",
    // amber sample polyline near the fallback position (landing preview only)
    path: [
      [23.8103, 90.4125],
      [23.805, 90.405],
      [23.798, 90.4],
      [23.795, 90.41],
      [23.8, 90.425],
      [23.815, 90.432],
    ],
  },
];

export const AVOIDED_SEGMENT = [
  [23.815, 90.432],
  [23.825, 90.438],
  [23.8375, 90.428],
];

export const REPORTS = [
  { id: "R-1042", place: "Mirpur Rd, Dhaka", coords: [23.7588, 90.369], time: "12 min ago", status: "Verified", tone: "danger", depth: "Knee-deep", img: "flood" },
  { id: "R-1041", place: "GEC Circle, Chattogram", coords: [22.3569, 91.7832], time: "26 min ago", status: "Verified Clear", tone: "safe", depth: "Clear", img: "clear" },
  { id: "R-1039", place: "Zindabazar, Sylhet", coords: [24.8969, 91.87], time: "1 hr ago", status: "Pending review", tone: "caution", depth: "Ankle-deep (unverified)", img: "pending" },
  { id: "R-1036", place: "KDA Avenue, Khulna", coords: [22.8456, 89.5403], time: "2 hrs ago", status: "Verified", tone: "danger", depth: "Waist-deep", img: "flood" },
];

export const QUEUE = [
  { id: "R-1043", place: "Pinned location", reporter: "Submitted 2 min ago · GPS + photo", status: "In verification queue", tone: "caution" },
  { id: "R-1039", place: "Zindabazar, Sylhet", reporter: "Submitted 1 hr ago · 2 photos", status: "Awaiting 2nd confirmation", tone: "caution" },
];

export const LEGEND = [
  { color: "#15803d", label: "Safe", desc: "Verified Clear · ×1.0" },
  { color: "#ca8a04", label: "Caution", desc: "Unverified ×1.5 / Reported ×5" },
  { color: "#dc2626", label: "Avoid", desc: "Verified Waterlogged · ×∞" },
];
