"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceProps {
  invoice: any;
}

export default function InvoicePrint({ invoice }: InvoiceProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const user = useSelector((state: any) => state?.Auth?.loginUser);

  const handleDownloadPDF = () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // --- 1. HEADER & BRANDING ---
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // Blue-600
      doc.text("ThePrepRoute", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.text("Brillovate Pvt. Ltd.", 14, 28);
      doc.text("GE AMBIKA AMBIKA, SHIV BAGAN, Ranchi-834001", 14, 33);
      doc.text("GSTIN: 20AANCB5092K1ZJ", 14, 38);

      // Invoice Label
      doc.setFontSize(20);
      doc.setTextColor(200);
      doc.text("INVOICE", pageWidth - 14, 20, { align: "right" });
      
      // Status Badge (PAID)
      doc.setFillColor(220, 252, 231); // Light Green
      doc.roundedRect(pageWidth - 35, 25, 21, 8, 2, 2, "F");
      doc.setFontSize(10);
      doc.setTextColor(22, 101, 52); // Dark Green
      doc.setFont("helvetica", "bold");
      doc.text("PAID", pageWidth - 24.5, 30.5, { align: "center" });

      // --- 2. INFO SECTION ---
      doc.setDrawColor(229, 231, 235);
      doc.line(14, 45, pageWidth - 14, 45); // Horizontal line

      // Billed To
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("BILLED TO", 14, 55);
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text(user?.username || "Valued Customer", 14, 62);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(user?.email || "N/A", 14, 67);
      doc.text(user?.phone || "", 14, 72);

      // Invoice Details
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("INVOICE DETAILS", pageWidth - 14, 55, { align: "right" });
      doc.setTextColor(100);
      doc.setFontSize(10);
      doc.text(`Invoice No: ${invoice?.otherdetsil?.invoiceNo || "N/A"}`, pageWidth - 14, 62, { align: "right" });
      doc.text(`Order ID: ${invoice?.otherdetsil?.receipt}`, pageWidth - 14, 67, { align: "right" });
      doc.text(`Date: ${new Date(invoice?.updatedAt).toLocaleDateString("en-IN")}`, pageWidth - 14, 72, { align: "right" });

      // --- 3. ITEMS TABLE ---
      autoTable(doc, {
        startY: 85,
        head: [["Description", "Qty", "Price", "Amount"]],
        body: [
          [
            { content: invoice?.plan?.title || "Plan Subscription", styles: { fontStyle: 'bold' } },
            "1",
            `INR ${invoice?.plan?.price}`,
            `INR ${invoice?.amount}`
          ]
        ],
        headStyles: {
          fillColor: [248, 250, 252],
          textColor: [71, 85, 105],
          fontSize: 10,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 10,
          textColor: [30, 41, 59],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
        margin: { left: 14, right: 14 },
      });

      // --- 4. TOTAL SECTION ---
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      
      
      doc.setFontSize(16);
      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
    

      // --- 5. FOOTER ---
      doc.setFontSize(9);
      doc.setTextColor(180);
      doc.setFont("helvetica", "normal");
      doc.text("Thank you for your business!", pageWidth / 2, 280, { align: "center" });

      // Save the PDF
      doc.save(`Invoice_${invoice?.otherdetsil?.receipt}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={isDownloading}
      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
    >
      <svg className={`w-5 h-5 ${isDownloading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isDownloading ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        )}
      </svg>
      {isDownloading ? "Processing..." : "Download Invoice"}
    </button>
  );
}