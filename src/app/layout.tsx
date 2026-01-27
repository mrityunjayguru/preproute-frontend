"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Script from "next/script";

import ReduxProvider from "@/store/ReduxProvider";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/userLayout";

import localFont from "next/font/local";
import { Poppins, DM_Sans } from "next/font/google";

import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

/* ===================== FONTS ===================== */
const artegra = localFont({
  src: "../assets/fonts/artegra-soft-regular.woff",
  variable: "--font-artegra",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

/* ===================== ROOT LAYOUT ===================== */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const LayoutComponent = isDashboard ? AdminLayout : UserLayout;

  return (
    <html lang="en">
      <head>
        {/* ===================== GOOGLE TAG MANAGER ===================== */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MVRFXP3L');
            `,
          }}
        />

        {/* ===================== FONT AWESOME ===================== */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>

      <body
        className={`${artegra.variable} ${poppins.variable} ${dmSans.variable}`}
      >
        {/* ===================== GTM NOSCRIPT ===================== */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MVRFXP3L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ===================== APP ===================== */}
        <ReduxProvider>
          <LayoutComponent>
            {children}
            <Toaster />
          </LayoutComponent>
        </ReduxProvider>
      </body>
    </html>
  );
}
