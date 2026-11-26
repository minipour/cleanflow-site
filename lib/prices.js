// ============================================================
// CleanFlow AI — PRICE LIST (the ONLY place prices live)
// Both the Price Estimate page and the AI assistant read this file,
// so they always quote the same numbers.
//
// THESE ARE SAMPLE PRICES (CAD). Change them to your real prices.
// Gheymat-ha NEMUNE hastand — inja avazeshun kon.
// ============================================================

export const CURRENCY = "CAD";

// Every estimate is shown as a range: estimate minus/plus this percent.
export const RANGE_PERCENT = 10;

export const SERVICES = [
  {
    id: "standard",
    name: "Standard Home Cleaning",
    type: "home",
    short: "Regular upkeep for a fresh, tidy home.",
    basePrice: 110,
    perSqft: 0.05,
    perBedroom: 15,
    sqftPerHour: 500,
    includes: [
      "Dusting all reachable surfaces",
      "Vacuuming and mopping floors",
      "Kitchen counters, sink and outside of appliances",
      "Bathrooms: toilet, shower, tub, sink and mirrors",
      "Emptying garbage bins",
    ],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    type: "home",
    short: "Top-to-bottom clean for homes that need extra care.",
    basePrice: 170,
    perSqft: 0.08,
    perBedroom: 25,
    sqftPerHour: 330,
    includes: [
      "Everything in Standard Cleaning",
      "Baseboards, door frames and light switches",
      "Inside microwave and outside of cabinets",
      "Scrubbing tile grout and soap scum",
      "Behind and under movable furniture",
    ],
  },
  {
    id: "office",
    name: "Office Cleaning",
    type: "office",
    short: "Clean, healthy workspaces for small and medium offices.",
    basePrice: 140,
    perSqft: 0.07,
    perBedroom: 0,
    sqftPerHour: 600,
    includes: [
      "Desks, tables and shared surfaces wiped and sanitized",
      "Floors vacuumed and mopped",
      "Kitchenette and break room",
      "Washrooms cleaned and restocked (your supplies)",
      "Garbage and recycling removed",
    ],
  },
  {
    id: "move",
    name: "Move-In / Move-Out Cleaning",
    type: "home",
    short: "Empty-home clean so you can hand over or move in with ease.",
    basePrice: 220,
    perSqft: 0.1,
    perBedroom: 30,
    sqftPerHour: 300,
    includes: [
      "Everything in Deep Cleaning",
      "Inside all cabinets, drawers and closets",
      "Inside fridge and oven",
      "Walls spot-cleaned",
      "Balcony or entrance swept",
    ],
  },
  {
    id: "recurring",
    name: "Recurring Cleaning",
    type: "home",
    short: "Weekly, every-two-weeks or monthly visits at a lower price.",
    basePrice: 100,
    perSqft: 0.045,
    perBedroom: 12,
    sqftPerHour: 520,
    requiresRecurring: true,
    includes: [
      "Everything in Standard Cleaning",
      "Same cleaning team whenever possible",
      "Flexible checklist that you can change any time",
      "Frequency discount applied automatically",
    ],
  },
  {
    id: "windows",
    name: "Window Cleaning",
    type: "home",
    short: "Streak-free interior windows, sills and tracks.",
    basePrice: 90,
    perSqft: 0.04,
    perBedroom: 10,
    sqftPerHour: 700,
    includes: [
      "Interior window glass",
      "Window sills and frames",
      "Window tracks vacuumed and wiped",
      "Glass doors and mirrors",
    ],
  },
];

// Frequency discounts (percent off the visit price)
export const FREQUENCIES = [
  { id: "once", label: "One time", discount: 0 },
  { id: "monthly", label: "Monthly", discount: 5 },
  { id: "biweekly", label: "Every 2 weeks", discount: 10 },
  { id: "weekly", label: "Weekly", discount: 15 },
];

// Optional extras (flat price each)
export const ADDONS = [
  { id: "oven", label: "Inside oven", price: 35 },
  { id: "fridge", label: "Inside fridge", price: 30 },
  { id: "cabinets", label: "Inside cabinets", price: 40 },
  { id: "laundry", label: "Laundry (wash and fold, 1 load)", price: 25 },
  { id: "balcony", label: "Balcony / patio", price: 30 },
];

// Booking time slots
export const TIME_SLOTS = [
  { id: "morning", label: "Morning (8:00 - 12:00)" },
  { id: "afternoon", label: "Afternoon (12:00 - 16:00)" },
  { id: "evening", label: "Evening (16:00 - 20:00)" },
];

export function getService(id) {
  return SERVICES.find((s) => s.id === id);
}
