import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import { LangProvider } from "@/components/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script"
import AnalyticsTracker from "@/components/AnalyticsTracker"

export const metadata: Metadata = {
  title: "Lanyeri Rahnya — Full Stack Developer & Interface Designer",
  description:
"Portfolio of Lanyeri Rahnya — BUT MMI student, developer and interface designer passionate about building exceptional digital products.",
  icons:{
    icon: "/favicon.png"
  },
  keywords: ["developer", "designer", "portfolio", "Next.js", "TypeScript", "UX/UI"],
  verification: {
    google: "4iKVP3WeVNyL4RrwzOvYrg_sTVCj_KmGc0fhaUdMNoE"
  },
  openGraph: {
    title: "Lanyeri Rahnya — Full Stack Developer & Interface Designer",
    description: "Portfolio of Lanyeri Rahnya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className="transition-colors">
      <ThemeProvider>
          <LangProvider>
            <AnalyticsTracker />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N4DJGHWE6D"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-N4DJGHWE6D');
          `}
        </Script>
      </body>
    </html>
  );
}