import { EstimateFromQuery } from "@/components/QueryForms";

export const metadata = { title: "Price Estimate — CleanFlow AI" };

export default function EstimatePage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Price Estimate</h1>
        <p className="lead">Get an instant approximate price. Change the details and the estimate updates right away.</p>
        <EstimateFromQuery />
      </div>
    </section>
  );
}
