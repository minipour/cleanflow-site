import BookingForm from "@/components/BookingForm";

export const metadata = { title: "Booking — CleanFlow AI" };

export default async function BookingPage({ searchParams }) {
  const p = (await searchParams) || {};
  const str = (v) => (typeof v === "string" ? v : "");
  return (
    <section className="section">
      <div className="container">
        <h1>Request a booking</h1>
        <p className="lead">Send your request and our team will contact you to confirm the time and final price. Nothing is charged online.</p>
        <BookingForm
          initial={{
            serviceId: str(p.service),
            sqft: Number(str(p.sqft)) || 1200,
            bedrooms: str(p.bedrooms) !== "" ? Number(str(p.bedrooms)) : 2,
            frequency: str(p.frequency) || "once",
            addons: str(p.addons) ? str(p.addons).split(",") : [],
          }}
        />
      </div>
    </section>
  );
}
