"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { SERVICES, TIME_SLOTS, FREQUENCIES, ADDONS } from "@/lib/prices";
import { calculateEstimate, formatCAD } from "@/lib/estimate";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function BookingForm({ initial }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceId: SERVICES.some((s) => s.id === initial.serviceId) ? initial.serviceId : "standard",
    date: "",
    timeSlot: "",
    sqft: initial.sqft,
    bedrooms: initial.bedrooms,
    frequency: FREQUENCIES.some((f) => f.id === initial.frequency) ? initial.frequency : "once",
    addons: initial.addons.filter((a) => ADDONS.some((x) => x.id === a)),
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const service = SERVICES.find((s) => s.id === form.serviceId);
  const est = useMemo(() => calculateEstimate(form), [form]);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setErrors({});
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) setErrors(data.errors || { form: "Something went wrong." });
      else {
        setDone(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrors({ form: "Could not send your request. Please try again." });
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="card confirm">
        <span className="confirm-check" aria-hidden="true">✓</span>
        <h2>Request received!</h2>
        <p>Your reference number is <b className="ref">{done.reference}</b></p>
        <ul className="summary">
          <li><span>Service</span><b>{done.service}</b></li>
          <li><span>Date</span><b>{done.date}</b></li>
          <li><span>Time</span><b>{done.timeSlot}</b></li>
          <li><span>Estimate</span><b>{formatCAD(done.estimate.total)} ({formatCAD(done.estimate.low)}–{formatCAD(done.estimate.high)})</b></li>
        </ul>
        <p className="muted">Our team will contact you to confirm the time and final price.</p>
        <div className="actions">
          <Link href="/" className="btn">Back to home</Link>
          <Link href="/chat" className="btn btn-ghost">Ask a question</Link>
        </div>
      </div>
    );
  }

  const Err = ({ k }) => (errors[k] ? <small className="error">{errors[k]}</small> : null);

  return (
    <form className="estimate-layout" onSubmit={submit} noValidate>
      <div className="card form">
        <h2 className="h3">Your details</h2>
        <div className="row">
          <label className="field"><span>Full name</span><input value={form.name} onChange={set("name")} autoComplete="name" /><Err k="name" /></label>
          <label className="field"><span>Phone</span><input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" /><Err k="phone" /></label>
        </div>
        <label className="field"><span>Email</span><input type="email" value={form.email} onChange={set("email")} autoComplete="email" /><Err k="email" /></label>
        <label className="field"><span>Cleaning address</span><input value={form.address} onChange={set("address")} autoComplete="street-address" /><Err k="address" /></label>

        <h2 className="h3">Cleaning</h2>
        <label className="field">
          <span>Service</span>
          <select value={form.serviceId} onChange={set("serviceId")}>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <Err k="serviceId" />
        </label>
        <div className="row">
          <label className="field"><span>Size (sq ft)</span><input type="number" min="200" max="20000" value={form.sqft} onChange={(e) => setForm((f) => ({ ...f, sqft: Number(e.target.value) }))} /><Err k="sqft" /></label>
          {service.type !== "office" && (
            <label className="field"><span>Bedrooms</span><input type="number" min="0" max="10" value={form.bedrooms} onChange={(e) => setForm((f) => ({ ...f, bedrooms: Number(e.target.value) }))} /><Err k="bedrooms" /></label>
          )}
        </div>
        <label className="field">
          <span>How often?</span>
          <select value={form.frequency} onChange={set("frequency")}>
            {FREQUENCIES.map((f) => <option key={f.id} value={f.id}>{f.label}{f.discount ? ` (−${f.discount}%)` : ""}</option>)}
          </select>
        </label>
        <div className="field">
          <span>Add-ons</span>
          <div className="checkbox-list">
            {ADDONS.map((a) => (
              <label key={a.id} className="checkbox">
                <input
                  type="checkbox"
                  checked={form.addons.includes(a.id)}
                  onChange={() =>
                    setForm((f) => ({ ...f, addons: f.addons.includes(a.id) ? f.addons.filter((x) => x !== a.id) : [...f.addons, a.id] }))
                  }
                />
                {a.label} <span className="muted">+{formatCAD(a.price)}</span>
              </label>
            ))}
          </div>
        </div>

        <h2 className="h3">Date &amp; time</h2>
        <label className="field"><span>Date</span><input type="date" min={todayISO()} value={form.date} onChange={set("date")} /><Err k="date" /></label>
        <div className="field">
          <span>Time slot</span>
          <div className="chips">
            {TIME_SLOTS.map((t) => (
              <button type="button" key={t.id} className={`chip ${form.timeSlot === t.id ? "on" : ""}`} onClick={() => setForm((f) => ({ ...f, timeSlot: t.id }))}>
                {t.label}
              </button>
            ))}
          </div>
          <Err k="timeSlot" />
        </div>
        <label className="field"><span>Notes (optional)</span><textarea rows="3" value={form.notes} onChange={set("notes")} placeholder="Pets, parking, access instructions, special requests…" /></label>
      </div>

      <aside className="card result">
        <p className="eyebrow">Your estimate</p>
        <p className="big-price">{formatCAD(est.total)}</p>
        <p className="muted">Range {formatCAD(est.low)} – {formatCAD(est.high)} · about {est.hoursLow}–{est.hoursHigh} h</p>
        {errors.form && <p className="error">{errors.form}</p>}
        {Object.keys(errors).length > 0 && !errors.form && <p className="error">Please fix the highlighted fields.</p>}
        <button type="submit" className="btn btn-block" disabled={sending}>{sending ? "Sending…" : "Send booking request"}</button>
        <p className="muted small">Estimate only (sample prices). Final price is confirmed by our team.</p>
      </aside>
    </form>
  );
}
