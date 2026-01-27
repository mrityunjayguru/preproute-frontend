"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceProps {
  invoice: any;
}

/* 🔧 Fix jsPDF spacing issue */
const resetTextSpacing = (doc: jsPDF) => {
  doc.setCharSpace(0);
  doc.setFont("helvetica", "normal");
};

export default function InvoicePrint({ invoice }: InvoiceProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const user = useSelector((state: any) => state?.Auth?.loginUser);

  const handleDownloadPDF = () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      /* ================= HEADER ================= */
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(236, 98, 67);
      doc.text("thepreproute", 14, 20);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text("Brillovate Private Limited", 14, 28);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "GE AMBIKA AMBIKA, SHIV BAGAN, Ranchi-834001",
        14,
        33
      );
      doc.text("GSTIN: 20AANCB5092K1ZJ", 14, 38);

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", pageWidth - 14, 20, { align: "right" });

      /* PAID BADGE */
      doc.setFillColor(236, 98, 67);
      doc.roundedRect(pageWidth - 35, 25, 21, 8, 2, 2, "F");
      doc.setFontSize(10);
      doc.setTextColor(255);
      doc.text("PAID", pageWidth - 24.5, 30.5, { align: "center" });

      /* ================= INFO ================= */
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
      doc.setTextColor(80);
      doc.text(user?.email || "N/A", 14, 67);
      doc.text(user?.phone || "", 14, 72);

      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("INVOICE DETAILS", pageWidth - 14, 55, { align: "right" });

      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(
        `Invoice No: ${invoice?.otherdetsil?.invoiceNo}`,
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

      /* ================= TABLE ================= */
      autoTable(doc, {
        startY: 85,
        margin: { left: 14, right: 14 },
        theme: "grid",
        body: [
          [
            { content: "Plan Purchased", styles: { fontStyle: "bold" } },
            { content: invoice?.plan?.title, styles: { halign: "right" } },
          ],
          [
            { content: "Validity", styles: { fontStyle: "bold" } },
            { content: "Till Exam Date", styles: { halign: "right" } },
          ],
        ],
        styles: {
          fontSize: 9,
          cellPadding: 4,
          lineWidth: 0,
          textColor: [30, 41, 59],
        },
      });

      /* ================= GST CALCULATION ================= */
      const gstRate = 18;
      const amountInclGST = Number(invoice?.otherdetsil?.amount || 0);
      const basePrice = +(amountInclGST / (1 + gstRate / 100)).toFixed(2);
      const gstAmount = +(amountInclGST - basePrice).toFixed(2);
      const startY = (doc as any).lastAutoTable.finalY + 12;

      /* ================= GST UI ================= */

      // Amount Including GST
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Amount Including GST", 14, startY);

      resetTextSpacing(doc);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${amountInclGST}`, pageWidth - 14, startY, {
        align: "right",
      });

      doc.setFillColor(230, 230, 230);
      doc.roundedRect(14, startY + 5, pageWidth - 28, 3, 2, 2, "F");
      doc.setFillColor(34, 197, 94);
      doc.roundedRect(14, startY + 5, 14, 3, 2, 2, "F");
      doc.circle(28, startY + 6.5, 3, "F");

      // GST Rate
      const rateY = startY + 18;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("GST Slab/Rate", 14, rateY);

      resetTextSpacing(doc);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${gstRate} %`, pageWidth - 14, rateY, { align: "right" });

      doc.setFillColor(230, 230, 230);
      doc.roundedRect(14, rateY + 5, pageWidth - 28, 3, 2, 2, "F");

      const barWidth = ((pageWidth - 28) * gstRate) / 30;
      doc.setFillColor(34, 197, 94);
      doc.roundedRect(14, rateY + 5, barWidth, 3, 2, 2, "F");
      doc.circle(14 + barWidth, rateY + 6.5, 3, "F");

      // Base Price
      const baseY = rateY + 20;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Amount Excluding GST (Base Price)", 14, baseY);

      resetTextSpacing(doc);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${basePrice}`, pageWidth - 14, baseY, {
        align: "right",
      });

      // GST Amount
      const gstY = baseY + 10;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Total GST Amount", 14, gstY);

      resetTextSpacing(doc);
      doc.setFontSize(12);
      doc.setTextColor(0);
    doc.text(
        `${gstAmount}`,
        pageWidth - 14,
        gstY,
        { align: "right" }
      );

      /* ================= FOOTER ================= */
      doc.setFontSize(9);
      doc.setTextColor(180);
      doc.text(
        "Thank you for choosing us.",
        pageWidth / 2,
        280,
        { align: "center" }
      );

      doc.save(`Invoice_${invoice?.otherdetsil?.receipt}.pdf`);
    } catch (err) {
      console.error("PDF Error", err);
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
