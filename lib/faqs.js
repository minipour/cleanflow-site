// Frequently asked questions — used by the AI assistant (and its offline fallback).
// Edit these to match how your business really works.
export const FAQS = [
  {
    topic: "services",
    keywords: ["supplies", "equipment", "bring", "products", "chemicals"],
    q: "Do you bring your own supplies?",
    a: "Yes. Our team brings all cleaning supplies and equipment. If you prefer eco-friendly or specific products, tell us in the booking notes.",
  },
  {
    topic: "services",
    keywords: ["pet", "pets", "dog", "cat", "eco", "green", "safe"],
    q: "Are your products safe for kids and pets?",
    a: "We use gentle, household-safe products. Let us know about pets or allergies in the booking notes and we will adjust.",
  },
  {
    topic: "scheduling",
    keywords: ["how far", "advance", "ahead", "soon", "available", "availability", "same day", "tomorrow"],
    q: "How far ahead should I book?",
    a: "Booking 3 to 5 days ahead is best. Same-week visits are often possible, depending on availability.",
  },
  {
    topic: "scheduling",
    keywords: ["hours", "time", "slot", "weekend", "saturday", "sunday", "when"],
    q: "What times can I book?",
    a: "We offer three time slots: Morning (8:00 - 12:00), Afternoon (12:00 - 16:00) and Evening (16:00 - 20:00), seven days a week.",
  },
  {
    topic: "scheduling",
    keywords: ["cancel", "reschedule", "change date", "move my booking"],
    q: "Can I cancel or reschedule?",
    a: "Yes. Please let us know at least 24 hours before your visit to cancel or reschedule at no charge.",
  },
  {
    topic: "pricing",
    keywords: ["final", "exact", "estimate", "accurate", "quote"],
    q: "Is the online price final?",
    a: "No. The online price is an estimate. We confirm the final price after reviewing your home or office details with you.",
  },
  {
    topic: "pricing",
    keywords: ["pay", "payment", "deposit", "card", "cash", "e-transfer"],
    q: "How do I pay?",
    a: "Payment is made after the cleaning is done. We will confirm payment options when we contact you about your booking.",
  },
  {
    topic: "pricing",
    keywords: ["discount", "cheaper", "recurring", "weekly", "monthly", "save"],
    q: "Do you offer discounts?",
    a: "Yes. Recurring visits are cheaper: 5% off monthly, 10% off every two weeks and 15% off weekly.",
  },
  {
    topic: "process",
    keywords: ["after", "next", "process", "how does it work", "confirm", "request"],
    q: "What happens after I send a booking request?",
    a: "We review your request, then contact you to confirm the date, time and final price. Nothing is charged online.",
  },
  {
    topic: "process",
    keywords: ["home", "be there", "key", "access", "present"],
    q: "Do I need to be home during the cleaning?",
    a: "No. Many clients give us access instructions. Just add them to the booking notes.",
  },
];
