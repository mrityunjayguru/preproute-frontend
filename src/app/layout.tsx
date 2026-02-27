
"use client";

import "./globals.css";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

import ReduxProvider from "@/store/ReduxProvider";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/userLayout";

import localFont from "next/font/local";
import { Poppins, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import DisableDevTools from "./DisableDevTools";
import NetworkStatus from "@/Common/NetworkStatus";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

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

/* ===================== PAGE VIEW TRACKER (SPA FIX) ===================== */
function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}

/* ===================== ROOT LAYOUT ===================== */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const LayoutComponent = isDashboard ? AdminLayout : UserLayout;
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;


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
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MVRFXP3L');
            `,
          }}
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
        <GoogleOAuthProvider clientId={clientId}>
        <ReduxProvider>
          <PageViewTracker />
          <LayoutComponent>
            <NetworkStatus />
             {/* <DisableDevTools /> */}
            {children}
            <Toaster />
          </LayoutComponent>
        </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
