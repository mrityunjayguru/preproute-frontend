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
console.log(invoice,"invoiceinvoiceinvoice")
  const handleDownloadPDF = () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // ---------------- HEADER ----------------
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(236, 98, 67);
      doc.text("thepreproute", 14, 20);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Brillovate Private Limited", 14, 28);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("GE AMBIKA AMBIKA, SHIV BAGAN, Ranchi-834001", 14, 33);
      doc.text("GSTIN: 20AANCB5092K1ZJ", 14, 38);

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", pageWidth - 14, 20, { align: "right" });

      // PAID badge
      doc.setFillColor(236, 98, 67);
      doc.roundedRect(pageWidth - 35, 25, 21, 8, 2, 2, "F");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("PAID", pageWidth - 24.5, 30.5, { align: "center" });

      // ---------------- INFO SECTION ----------------
      doc.setDrawColor(229, 231, 235);
      doc.line(14, 45, pageWidth - 14, 45);

      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("BILLED TO", 14, 55);

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text(user?.username || "Valued Customer", 14, 62);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(user?.email || "N/A", 14, 67);
      doc.text(user?.phone || "", 14, 72);

      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("INVOICE DETAILS", pageWidth - 14, 55, { align: "right" });

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(
        `Invoice No: ${invoice?.otherdetsil?.invoiceNo }`,
        pageWidth - 14,
        62,
        { align: "right" }
      );
      doc.text(
        `Order ID: ${invoice?.otherdetsil?.receipt}`,
        pageWidth - 14,
        67,
        { align: "right" }
      );
      doc.text(
        `Date: ${new Date(
          invoice?.otherdetsil?.updatedAt
        ).toLocaleDateString("en-IN")}`,
        pageWidth - 14,
        72,
        { align: "right" }
      );

      // =================================================
      // ✅ TABLE FIX STARTS HERE (NO UI CHANGE)
      // =================================================

      const tableStartY = 85; // safe fixed Y (no dependency)

   autoTable(doc, {
  startY: tableStartY,
  theme: "grid",
  margin: { left: 14, right: 14 },

  body: [
    [
      { content: "Plan Purchased", styles: { fontStyle: "bold" } },
      { content: `${invoice?.plan?.title}`, styles: { halign: "right" } },
    ],
    [
      { content: "Validity", styles: { fontStyle: "bold" } },
      { content: "Till Exam Date", styles: { halign: "right" } },
    ],
    [
      { content: "Amount", styles: { fontStyle: "bold" } },
      { content: `${invoice?.plan?.price}`, styles: { halign: "right" } },
    ],
    [
      { content: "Discount", styles: { fontStyle: "bold" } },
      { content: `${invoice?.couponDetail?.discountValue}`, styles: { halign: "right" } },
    ],
    [
      {
        content: "Total Payable",
        styles: { fontStyle: "bold", fontSize: 11 },
      },
      {
        content: `${invoice?.otherdetsil?.amount}`,
        styles: {
          halign: "right",
          fontStyle: "bold",
          fontSize: 11,
        },
      },
    ],
    [
      {
        content: "Included 18% GST",
        colSpan: 2,
        styles: { halign: "left", fontSize: 8 },
      },
    ],
  ],

  styles: {
    fontSize: 9,
    cellPadding: 4,
    textColor: [30, 41, 59],
    lineWidth: 0, // ❌ remove all borders by default
  },

  didParseCell(data) {
    const lastRowIndex = data.table.body.length - 1;

    // Highlight total row (optional – keep if you want)
    if (data.row.index === 4) {
      data.cell.styles.fillColor = [243, 244, 246];
    }

    // ✅ ONLY GST ROW HAS BORDER
    // if (data.row.index === lastRowIndex) {
    //   data.cell.styles.lineWidth = 0.5;
    //   data.cell.styles.lineColor = [200, 200, 200];
    // }
  },
});


      // =================================================
      // ✅ TABLE FIX ENDS HERE
      // =================================================

      // ---------------- FOOTER ----------------
      doc.setFontSize(9);
      doc.setTextColor(180);
      doc.text(
        "Thank you for choosing us.",
        pageWidth / 2,
        280,
        { align: "center" }
      );

      doc.save(`Invoice_${invoice?.otherdetsil?.receipt}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button onClick={handleDownloadPDF} disabled={isDownloading}>
      {isDownloading ? "Processing..." : "Download Invoice"}
    </button>
  );
}
