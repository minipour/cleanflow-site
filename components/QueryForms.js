"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import EstimateForm from "@/components/EstimateForm";

// Reads ?service=... etc. in the browser, so the pages also work as a
// static site (for example on GitHub Pages).
function BookingInner() {
  const p = useSearchParams();
  const str = (k) => p.get(k) || "";
  return (
    <BookingForm
      initial={{
        serviceId: str("service"),
        sqft: Number(str("sqft")) || 1200,
        bedrooms: str("bedrooms") !== "" ? Number(str("bedrooms")) : 2,
        frequency: str("frequency") || "once",
        addons: str("addons") ? str("addons").split(",") : [],
      }}
    />
  );
}

function EstimateInner() {
  const p = useSearchParams();
  return <EstimateForm initialService={p.get("service") || "standard"} />;
}

export function BookingFromQuery() {
  return (
    <Suspense fallback={null}>
      <BookingInner />
    </Suspense>
  );
}

export function EstimateFromQuery() {
  return (
    <Suspense fallback={null}>
      <EstimateInner />
    </Suspense>
  );
}
