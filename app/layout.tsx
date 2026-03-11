import type { Metadata } from "next";
import "@/styles/globals.css";
import { LangProvider } from "@/components/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lanyeri Rahnya — Full Stack Developer & Interface Designer",
  description:
    "Portfolio of Lanyeri Rahnya — BUT MMI student, developer and interface designer passionate about building exceptional digital products.",
  keywords: ["developer", "designer", "portfolio", "Next.js", "TypeScript", "UX/UI"],
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
    <html lang="en">
      <body className="bg-[#0D1B2A]">
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
