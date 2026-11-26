// Server-side booking validation ("Validate Form" in the diagram).
import { getService, TIME_SLOTS, FREQUENCIES, ADDONS } from "./prices";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

const clean = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function validateBooking(body = {}) {
  const errors = {};
  const data = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 30),
    address: clean(body.address, 250),
    serviceId: clean(body.serviceId, 30),
    date: clean(body.date, 10),
    timeSlot: clean(body.timeSlot, 20),
    sqft: Number(body.sqft) || 0,
    bedrooms: Number(body.bedrooms) || 0,
    frequency: clean(body.frequency, 20) || "once",
    addons: Array.isArray(body.addons) ? body.addons.filter((a) => ADDONS.some((x) => x.id === a)) : [],
    notes: clean(body.notes, 1000),
  };

  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.address.length < 5) errors.address = "Please enter the cleaning address.";
  if (!getService(data.serviceId)) errors.serviceId = "Please choose a service.";
  if (!TIME_SLOTS.some((t) => t.id === data.timeSlot)) errors.timeSlot = "Please choose a time slot.";
  if (!FREQUENCIES.some((f) => f.id === data.frequency)) data.frequency = "once";
  if (data.sqft < 200 || data.sqft > 20000) errors.sqft = "Size must be between 200 and 20,000 sq ft.";
  if (data.bedrooms < 0 || data.bedrooms > 10) errors.bedrooms = "Bedrooms must be between 0 and 10.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.date = "Please choose a date.";
  } else {
    const chosen = new Date(data.date + "T12:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setDate(max.getDate() + 365);
    if (isNaN(chosen) || chosen < today) errors.date = "Please choose today or a future date.";
    else if (chosen > max) errors.date = "Please choose a date within the next year.";
  }

  return { ok: Object.keys(errors).length === 0, errors, data };
}
