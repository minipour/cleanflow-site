import Link from "next/link";
import { SERVICES, ADDONS, FREQUENCIES } from "@/lib/prices";
import { formatCAD } from "@/lib/estimate";
import { serviceImg } from "@/lib/images";

export const metadata = { title: "Services — CleanFlow AI" };

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Services</h1>
        <p className="lead">Every visit includes our own supplies and equipment. Prices below are sample starting prices.</p>

        <div className="grid services-grid">
          {SERVICES.map((s) => (
            <article className="card" key={s.id} id={s.id}>
              <img className="card-img" src={serviceImg(s.id)} alt={s.name} loading="lazy" />
              <h2 className="h3">{s.name}</h2>
              <p className="muted">{s.short}</p>
              <p className="price">From {formatCAD(s.basePrice)}</p>
              <h4>What&apos;s included</h4>
              <ul className="checks">
                {s.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="card-actions">
                <Link href={`/estimate?service=${s.id}`} className="btn btn-small">Estimate price</Link>
                <Link href={`/booking?service=${s.id}`} className="btn btn-small btn-ghost">Book</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <h2 className="h3">Add-ons</h2>
            <ul className="price-list">
              {ADDONS.map((a) => (
                <li key={a.id}>
                  <span>{a.label}</span>
                  <b>{formatCAD(a.price)}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="h3">Recurring discounts</h2>
            <ul className="price-list">
              {FREQUENCIES.map((f) => (
                <li key={f.id}>
                  <span>{f.label}</span>
                  <b>{f.discount ? `${f.discount}% off` : "Regular price"}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
