import { NextResponse } from "next/server";
import { validateBooking } from "@/lib/validateBooking";
import { calculateEstimate } from "@/lib/estimate";
import { getService, TIME_SLOTS } from "@/lib/prices";

// "Create Booking" from the diagram.
// NOTE: There is NO database yet. The booking is validated, given a
// reference number and written to the server log only. It is NOT saved.
// To keep bookings, connect a database (e.g. Supabase) or an email service here.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const { ok, errors, data } = validateBooking(body);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const estimate = calculateEstimate(data);
  const reference =
    "CF-" + Date.now().toString(36).toUpperCase().slice(-5) + Math.floor(Math.random() * 90 + 10);

  // Log only (visible in Vercel > Project > Logs). Replace with a DB insert or email later.
  console.log("[booking request]", JSON.stringify({ reference, ...data, estimate: estimate.total }));

  return NextResponse.json({
    ok: true,
    reference,
    service: getService(data.serviceId).name,
    date: data.date,
    timeSlot: TIME_SLOTS.find((t) => t.id === data.timeSlot).label,
    estimate,
  });
}
