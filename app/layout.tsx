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
  keywords: ["developer", "designer", "portfolio", "Next.js", "TypeScript", "UX/UI", "BUT MMI", "Toulon"],
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* 🎨 SCRIPT D'INIT DU THÈME - Évite le flash de couleur */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
                // Par défaut : mode clair avec VOS couleurs
              })();
            `,
          }}
        />
      </head>
      <body className="transition-colors">
        {/* Skip to content link — appears on keyboard focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-text-primary focus:text-white focus:font-body focus:text-sm dark:focus:bg-pink"
        >
          Aller au contenu principal
        </a>

        <ThemeProvider>
          <LangProvider>
            <AnalyticsTracker />
            <Navbar />
            <main id="main-content">{children}</main>
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
