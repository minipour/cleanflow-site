import Link from "next/link";
import { SERVICES } from "@/lib/prices";
import { formatCAD } from "@/lib/estimate";
import { img, serviceImg } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">Home &amp; office cleaning</p>
            <h1>A spotless space, without the stress.</h1>
            <p className="lead">
              See our services, get an instant price estimate, and request your cleaning in minutes. Questions?
              Our AI assistant answers right away.
            </p>
            <div className="actions">
              <Link href="/estimate" className="btn">Get a price estimate</Link>
              <Link href="/booking" className="btn btn-ghost">Book a cleaning</Link>
            </div>
          </div>
          <div className="hero-side">
          <img className="hero-img" src={img("home")} alt="Cleaners at work in a bright living room" />
          <div className="hero-card">
            <h3>Why CleanFlow</h3>
            <ul className="checks">
              <li>We bring all supplies and equipment</li>
              <li>Instant online estimate</li>
              <li>Morning, afternoon &amp; evening slots</li>
              <li>Discounts for recurring visits</li>
            </ul>
          </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Our services</h2>
            <Link href="/services">See all details →</Link>
          </div>
          <div className="grid">
            {SERVICES.map((s) => (
              <Link href="/services" key={s.id} className="card card-link">
                <img className="card-img" src={serviceImg(s.id)} alt={s.name} loading="lazy" />
                <h3>{s.name}</h3>
                <p className="muted">{s.short}</p>
                <p className="price">From {formatCAD(s.basePrice)}*</p>
              </Link>
            ))}
          </div>
          <p className="muted small">*Sample starting prices. Your estimate depends on size, rooms, frequency and extras.</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>How it works</h2>
          <div className="steps">
            {[
              ["1", "Choose a service", "Pick the cleaning that fits your home or office."],
              ["2", "Get your estimate", "Enter the size, rooms and extras for an instant price."],
              ["3", "Request a booking", "Choose a date and time slot and send your request."],
              ["4", "We confirm", "Our team contacts you to confirm the time and final price."],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <span className="step-num">{n}</span>
                <h3>{t}</h3>
                <p className="muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta">
          <div>
            <h2>Have a question?</h2>
            <p className="muted">Ask our AI assistant about services, scheduling, pricing or how the process works.</p>
          </div>
          <Link href="/chat" className="btn">Chat with the assistant</Link>
        </div>
      </section>
    </>
  );
}
