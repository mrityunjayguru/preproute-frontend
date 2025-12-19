"use client";

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(
  () => import("./InvoicePDF.client"),
  { ssr: false } // 🔥 THIS FIXES EVERYTHING
);

export default function InvoiceCard({ invoice }: any) {
  return (
    <div className="p-4 border rounded">
      <p>Title: {invoice?.plan?.title}</p>
      <p>Price: ₹{invoice?.plan?.price}</p>

      <InvoicePDF invoice={invoice} />
    </div>
  );
}
