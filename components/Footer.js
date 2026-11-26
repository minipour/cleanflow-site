import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>CleanFlow AI</strong>
          <p className="muted">Home &amp; office cleaning made simple.</p>
        </div>
        <div className="footer-links">
          <Link href="/services">Services</Link>
          <Link href="/estimate">Price Estimate</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/chat">AI Assistant</Link>
        </div>
        <p className="muted small">All prices shown are estimates. The final price is confirmed by our team.</p>
      </div>
    </footer>
  );
}
