import EstimateForm from "@/components/EstimateForm";

export const metadata = { title: "Price Estimate — CleanFlow AI" };

export default async function EstimatePage({ searchParams }) {
  const params = (await searchParams) || {};
  return (
    <section className="section">
      <div className="container">
        <h1>Price Estimate</h1>
        <p className="lead">Get an instant approximate price. Change the details and the estimate updates right away.</p>
        <EstimateForm initialService={typeof params.service === "string" ? params.service : "standard"} />
      </div>
    </section>
  );
}
