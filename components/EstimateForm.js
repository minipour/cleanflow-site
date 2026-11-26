"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { SERVICES, FREQUENCIES, ADDONS } from "@/lib/prices";
import { calculateEstimate, formatCAD } from "@/lib/estimate";

export default function EstimateForm({ initialService }) {
  const [serviceId, setServiceId] = useState(
    SERVICES.some((s) => s.id === initialService) ? initialService : "standard"
  );
  const [sqft, setSqft] = useState(1200);
  const [bedrooms, setBedrooms] = useState(2);
  const [frequency, setFrequency] = useState("once");
  const [addons, setAddons] = useState([]);

  const service = SERVICES.find((s) => s.id === serviceId);
  const isOffice = service.type === "office";
  const est = useMemo(
    () => calculateEstimate({ serviceId, sqft, bedrooms, frequency, addons }),
    [serviceId, sqft, bedrooms, frequency, addons]
  );

  const toggleAddon = (id) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const bookingHref =
    `/booking?service=${serviceId}&sqft=${est.sqft}&bedrooms=${est.bedrooms}` +
    `&frequency=${frequency}&addons=${addons.join(",")}`;

  return (
    <div className="estimate-layout">
      <div className="card form">
        <label className="field">
          <span>Service</span>
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{isOffice ? "Office" : "Home"} size: <b>{sqft} sq ft</b></span>
          <input type="range" min="200" max="6000" step="50" value={sqft} onChange={(e) => setSqft(Number(e.target.value))} />
          <input type="number" min="200" max="20000" value={sqft} onChange={(e) => setSqft(Number(e.target.value))} />
        </label>

        {!isOffice && (
          <div className="field">
            <span>Bedrooms</span>
            <div className="stepper">
              <button type="button" onClick={() => setBedrooms((b) => Math.max(0, b - 1))} aria-label="Fewer bedrooms">−</button>
              <b>{bedrooms}</b>
              <button type="button" onClick={() => setBedrooms((b) => Math.min(10, b + 1))} aria-label="More bedrooms">+</button>
            </div>
          </div>
        )}

        <div className="field">
          <span>How often?</span>
          <div className="chips">
            {FREQUENCIES.map((f) => {
              const disabled = service.requiresRecurring && f.id === "once";
              return (
                <button
                  type="button"
                  key={f.id}
                  disabled={disabled}
                  className={`chip ${frequency === f.id || (service.requiresRecurring && frequency === "once" && f.id === "biweekly") ? "on" : ""}`}
                  onClick={() => setFrequency(f.id)}
                >
                  {f.label}{f.discount ? ` (−${f.discount}%)` : ""}
                </button>
              );
            })}
          </div>
          {service.requiresRecurring && frequency === "once" && (
            <p className="muted small">Recurring Cleaning is priced as every 2 weeks unless you pick another frequency.</p>
          )}
        </div>

        <div className="field">
          <span>Add-ons</span>
          <div className="checkbox-list">
            {ADDONS.map((a) => (
              <label key={a.id} className="checkbox">
                <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)} />
                {a.label} <span className="muted">+{formatCAD(a.price)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <aside className="card result" aria-live="polite">
        <p className="eyebrow">Estimated price</p>
        <p className="big-price">{formatCAD(est.total)}</p>
        <p className="muted">Range {formatCAD(est.low)} – {formatCAD(est.high)}</p>
        <ul className="summary">
          <li><span>Service</span><b>{est.service}</b></li>
          <li><span>Size</span><b>{est.sqft} sq ft</b></li>
          {!isOffice && <li><span>Bedrooms</span><b>{est.bedrooms}</b></li>}
          <li><span>Frequency</span><b>{est.frequency}{est.discountPercent ? ` (−${est.discountPercent}%)` : ""}</b></li>
          <li><span>Add-ons</span><b>{est.addons.length ? est.addons.length : "None"}</b></li>
          <li><span>Time</span><b>About {est.hoursLow}–{est.hoursHigh} hours</b></li>
        </ul>
        <Link href={bookingHref} className="btn btn-block">Book with this estimate</Link>
        <p className="muted small">This is an estimate (sample prices). Our team confirms the final price.</p>
      </aside>
    </div>
  );
}
