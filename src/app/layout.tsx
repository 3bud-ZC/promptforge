import type { Metadata } from "next";
import { Baloo_Bhaijaan_2, Handjet } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { I18nProvider } from "@/components/providers/I18nProvider";

const baloo = Baloo_Bhaijaan_2({
  variable: "--font-baloo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const handjet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PromptForge AI",
  description: "AI-powered prompt generator for design, build, fix, deploy, and planning workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${baloo.variable} ${handjet.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-slate-100">
        <I18nProvider>
          <div className="pf-app">
            <div className="pf-shell">
              <AppShell>{children}</AppShell>
            </div>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
