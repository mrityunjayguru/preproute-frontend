"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import InvoicePDF from "./InvoicePDF.client";

/* 🔹 Disable SSR */


interface Exam {
  _id: string;
  examname: string;
  fullExamduration: number;
}

interface Plan {
  title: string;
  price: string;
}

interface PurchaseDetail {
  orderId: string;
  amount: number;
  updatedAt: string;
  plan: Plan;
  exams: Exam[];
}

interface UserData {
  purchaseDetails?: PurchaseDetail[];
}

interface Props {
  user: UserData | null;
}

export default function PurchasedPlanSection({ user }: Props) {
  const [selectedInvoice, setSelectedInvoice] =
    useState<PurchaseDetail | null>(null);

  if (!user?.purchaseDetails?.length) return null;

  return (
    <>
      {user.purchaseDetails.map((purchase, index) => (
        <div
          key={purchase.orderId}
          className="mt-10 p-5 bg-white rounded-2xl border border-orange-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#FF5635] mb-3">
            Purchased Plan #{index + 1}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Plan Title:</strong> {purchase.plan?.title}
            </p>

            <p>
              <strong>Price:</strong> ₹{purchase.plan?.price}
            </p>

            <p>
              <strong>Purchased On:</strong>{" "}
              {new Date(purchase.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* 🔹 Show PDF button for selected invoice */}
          <button
            onClick={() => setSelectedInvoice(purchase)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded text-sm"
          >
            Generate Invoice
          </button>

          {selectedInvoice?.orderId === purchase.orderId && (
            <InvoicePDF invoice={selectedInvoice} />
          )}
        </div>
      ))}
    </>
  );
}
