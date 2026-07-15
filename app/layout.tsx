import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { LangProvider } from "@/components/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorLite from "@/components/CursorLite";

export const metadata = {
  title: "Rahnya Lanyeri — Design, Code & Entrepreneuriat",
  description: "Portfolio de Rahnya Lanyeri — designer, développeuse et fondatrice. BUT MMI Toulon, Snoozly, Rahnya Studio.",
  keywords: ["Rahnya Lanyeri", "BUT MMI", "Toulon", "Designer", "Developer", "Snoozly", "Rahnya Studio", "freelance"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-text-primary text-cream px-4 py-2 rounded font-body text-sm">
          Aller au contenu
        </a>
        <ThemeProvider>
          <LangProvider>
            <CursorLite />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
