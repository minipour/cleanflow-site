// Builds the AI assistant's knowledge (system prompt) and an offline
// fallback answerer used when no ANTHROPIC_API_KEY is set.
import { SERVICES, FREQUENCIES, ADDONS, TIME_SLOTS, RANGE_PERCENT, CURRENCY } from "./prices";
import { FAQS } from "./faqs";
import { calculateEstimate, formatCAD } from "./estimate";

export function buildSystemPrompt() {
  const services = SERVICES.map(
    (s) =>
      `- ${s.name} (id: ${s.id}, ${s.type}): starts at ${formatCAD(s.basePrice)} + ${s.perSqft} per sq ft` +
      (s.perBedroom ? ` + ${formatCAD(s.perBedroom)} per bedroom` : "") +
      `. ${s.short} Includes: ${s.includes.join("; ")}.`
  ).join("\n");
  const freqs = FREQUENCIES.map((f) => `${f.label}: ${f.discount}% off`).join(", ");
  const addons = ADDONS.map((a) => `${a.label} ${formatCAD(a.price)}`).join(", ");
  const slots = TIME_SLOTS.map((t) => t.label).join(", ");
  const faqs = FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  return `You are the friendly assistant for CleanFlow AI, a home and office cleaning service.
Answer questions about services, scheduling, pricing and the work process. Keep answers short, warm and clear.
Reply in the same language the customer writes in.

PRICING RULES (${CURRENCY}, sample prices — always call them estimates):
Visit price = base + (sq ft x per-sq-ft rate) + (bedrooms x per-bedroom rate, homes only).
Frequency discounts on the visit price: ${freqs}. Recurring Cleaning is always recurring (default every 2 weeks).
Add-ons (flat): ${addons}.
Totals are rounded to the nearest $5 and shown as a range of plus/minus ${RANGE_PERCENT}%.
Office cleaning ignores bedrooms. Minimum size used is 200 sq ft.

SERVICES:
${services}

TIME SLOTS: ${slots}, seven days a week.

FAQ:
${faqs}

RULES:
- Never promise an exact or final price; the final price is confirmed by the team.
- Do not invent services, prices, discounts or policies that are not listed above.
- To book, send people to the Booking page; to calculate, suggest the Price Estimate page.
- If you don't know something, say the team will confirm it after the booking request.`;
}

// ---------- Offline fallback (no API key) ----------
const norm = (t) => t.toLowerCase();

export function fallbackAnswer(message) {
  const text = norm(message || "");

  // Price question with numbers, e.g. "deep clean 1500 sqft 3 bedrooms"
  const sqftMatch = text.match(/(\d{3,5})\s*(sq\s*\.?\s*ft|sqft|square|sf)/);
  const bedMatch = text.match(/(\d{1,2})\s*(bed|bedroom|br)/);
  const service =
    SERVICES.find((s) => text.includes(s.id)) ||
    SERVICES.find((s) => text.includes(norm(s.name.split(" ")[0])));
  if (sqftMatch || (bedMatch && service)) {
    const est = calculateEstimate({
      serviceId: service ? service.id : "standard",
      sqft: sqftMatch ? Number(sqftMatch[1]) : 1000,
      bedrooms: bedMatch ? Number(bedMatch[1]) : 2,
      frequency: text.includes("weekly") && !text.includes("bi") ? "weekly" : text.includes("monthly") ? "monthly" : "once",
      addons: ADDONS.filter((a) => text.includes(a.id)).map((a) => a.id),
    });
    return `For ${est.service}, about ${est.sqft} sq ft${est.bedrooms ? ` and ${est.bedrooms} bedrooms` : ""} (${est.frequency}), the estimate is about ${formatCAD(est.total)} (range ${formatCAD(est.low)}–${formatCAD(est.high)}), roughly ${est.hoursLow}–${est.hoursHigh} hours. This is an estimate; the team confirms the final price. You can fine-tune it on the Price Estimate page.`;
  }

  // FAQ keyword match
  let best = null;
  let bestScore = 0;
  for (const f of FAQS) {
    const score = f.keywords.reduce((s, k) => (text.includes(k) ? s + 1 : s), 0);
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  if (best) return best.a;

  // Service description
  if (service) {
    return `${service.name}: ${service.short} It starts at ${formatCAD(service.basePrice)} (sample price) and includes: ${service.includes.join(", ")}.`;
  }

  if (/(service|offer|what do you do|clean)/.test(text)) {
    return `We offer: ${SERVICES.map((s) => s.name).join(", ")}. Ask me about any of them, or try the Price Estimate page for a quick price.`;
  }
  if (/(price|cost|how much|rate)/.test(text)) {
    return `Prices start at ${formatCAD(Math.min(...SERVICES.map((s) => s.basePrice)))} and depend on size, bedrooms, frequency and extras. Tell me the service, square feet and bedrooms, or use the Price Estimate page.`;
  }

  return "I can help with our services, prices, scheduling and how the process works. Try asking: “How much is a deep clean for 1200 sq ft with 2 bedrooms?” or “What times can I book?”";
}
