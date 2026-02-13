
import { Footer } from "./Footer";

import { Header } from "./Header";
import OfferBanner from "./OfferBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
              <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
