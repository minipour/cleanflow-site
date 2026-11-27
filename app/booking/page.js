import { BookingFromQuery } from "@/components/QueryForms";

export const metadata = { title: "Booking — CleanFlow AI" };

export default function BookingPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Request a booking</h1>
        <p className="lead">Send your request and our team will contact you to confirm the time and final price. Nothing is charged online.</p>
        <BookingFromQuery />
      </div>
    </section>
  );
}
