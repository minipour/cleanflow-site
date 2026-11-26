// Price calculation — shared by the Price Estimate page, the Booking page
// and the AI assistant. All numbers come from lib/prices.js.
import { SERVICES, FREQUENCIES, ADDONS, RANGE_PERCENT, getService } from "./prices";

const round5 = (n) => Math.round(n / 5) * 5;

/**
 * @param {{serviceId:string, sqft:number, bedrooms:number, frequency:string, addons:string[]}} input
 */
export function calculateEstimate({ serviceId, sqft, bedrooms = 0, frequency = "once", addons = [] }) {
  const service = getService(serviceId) || SERVICES[0];
  const size = Math.max(200, Math.min(20000, Number(sqft) || 0));
  const rooms = service.type === "office" ? 0 : Math.max(0, Math.min(10, Number(bedrooms) || 0));

  let freq = FREQUENCIES.find((f) => f.id === frequency) || FREQUENCIES[0];
  if (service.requiresRecurring && freq.id === "once") {
    freq = FREQUENCIES.find((f) => f.id === "biweekly");
  }

  const chosenAddons = ADDONS.filter((a) => addons.includes(a.id));
  const addonsTotal = chosenAddons.reduce((sum, a) => sum + a.price, 0);

  const visit = service.basePrice + size * service.perSqft + rooms * service.perBedroom;
  const discountAmount = visit * (freq.discount / 100);
  const total = round5(visit - discountAmount + addonsTotal);

  const low = round5(total * (1 - RANGE_PERCENT / 100));
  const high = round5(total * (1 + RANGE_PERCENT / 100));

  const hours = size / service.sqftPerHour + rooms * 0.25 + chosenAddons.length * 0.4;
  const hoursLow = Math.max(1, Math.floor(hours));
  const hoursHigh = Math.max(hoursLow + 1, Math.ceil(hours + 0.5));

  return {
    service: service.name,
    serviceId: service.id,
    sqft: size,
    bedrooms: rooms,
    frequency: freq.label,
    discountPercent: freq.discount,
    addons: chosenAddons.map((a) => a.label),
    total,
    low,
    high,
    hoursLow,
    hoursHigh,
  };
}

export function formatCAD(n) {
  return "$" + Number(n).toLocaleString("en-CA", { maximumFractionDigits: 0 });
}
