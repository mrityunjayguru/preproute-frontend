"use client";

import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/* 🔧 Fix jsPDF spacing issue */
const resetTextSpacing = (doc: jsPDF) => {
  doc.setCharSpace(0);
  doc.setFont("helvetica", "normal");
};

interface DownloadUserPDFProps {
  invoice: any;
  autoDownload?: boolean;
  onDone?: () => void;
}

export default function DownloadUserPDF({
  invoice,
  autoDownload = false,
  onDone,
}: DownloadUserPDFProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    if (!invoice) return;

    setIsDownloading(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      const user = invoice?.user;
      const order = invoice?.otherdetsil;
      const plan = invoice?.plan;

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
        "GE, AMBIKA ENCLAVE, SHIV BAGAN, MACKEY ROAD, UPPER BAZAAR, RANCHI, JHARKHAND - 834001",
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

      /* ================= USER INFO ================= */
      doc.setDrawColor(229, 231, 235);
      doc.line(14, 45, pageWidth - 14, 45);

      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("BILLED TO", 14, 55);

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text(user?.username || "User", 14, 62);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(user?.email || "N/A", 14, 67);
      doc.text(user?.phone || "-", 14, 72);

      /* ================= INVOICE INFO ================= */
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("INVOICE DETAILS", pageWidth - 14, 55, { align: "right" });

      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(`Invoice No: ${order?.invoiceNo || "-"}`, pageWidth - 14, 62, {
        align: "right",
      });
      doc.text(`Order ID: ${order?.receipt || "-"}`, pageWidth - 14, 67, {
        align: "right",
      });
      doc.text(
        `Date: ${order?.updatedAt
          ? new Date(order.updatedAt).toLocaleDateString("en-IN")
          : "-"}`,
        pageWidth - 14,
        72,
        { align: "right" }
      );

      /* ================= PLAN TABLE ================= */
      autoTable(doc, {
        startY: 85,
        margin: { left: 14, right: 14 },
        theme: "grid",
        body: [
          [
            { content: "Plan Purchased", styles: { fontStyle: "bold" } },
            { content: plan?.title || "-", styles: { halign: "right" } },
          ],
          [
            { content: "Validity", styles: { fontStyle: "bold" } },
            { content: "Till Exam Date", styles: { halign: "right" } },
          ],
        ],
        styles: {
          fontSize: 9,
          cellPadding: 4,
          textColor: [30, 41, 59],
        },
      });

      /* ================= GST CALCULATION ================= */
      const gstRate = 18;
      const amountInclGST = Number(order?.amount || 0);
      const basePrice = +(amountInclGST / (1 + gstRate / 100)).toFixed(2);
      const gstAmount = +(amountInclGST - basePrice).toFixed(2);

      const startY = (doc as any).lastAutoTable.finalY + 12;

      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Base Price", 14, startY);

      resetTextSpacing(doc);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`INR ${basePrice}`, pageWidth - 14, startY, { align: "right" });

      const rateY = startY + 10;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("GST Rate", 14, rateY);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${gstRate}%`, pageWidth - 14, rateY, { align: "right" });

      const gstY = rateY + 10;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("GST Amount", 14, gstY);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`INR ${gstAmount}`, pageWidth - 14, gstY, { align: "right" });

      const totalY = gstY + 10;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Total Amount", 14, totalY);

      doc.setFontSize(12);
      doc.setTextColor(236, 98, 67);
      doc.text(`INR ${amountInclGST}`, pageWidth - 14, totalY, {
        align: "right",
      });

      /* ================= FOOTER ================= */
      doc.setFontSize(9);
      doc.setTextColor(180);
      doc.text("Thank you for choosing us.", pageWidth / 2, 280, {
        align: "center",
      });

      doc.save(`Invoice_${order?.receipt || "user"}.pdf`);
    } catch (err) {
      console.error("PDF Error", err);
    } finally {
      setIsDownloading(false);
      onDone?.();
    }
  };

  /* 🔥 Auto download when row download clicked */
  useEffect(() => {
    if (autoDownload) {
      handleDownloadPDF();
    }
  }, [autoDownload]);

  return (
    <button onClick={handleDownloadPDF} disabled={isDownloading}>
      {isDownloading ? "Processing..." : "Download Invoice"}
    </button>
  );
}
