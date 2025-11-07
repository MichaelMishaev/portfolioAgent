import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n-context";
import { ContactUsFloatingButton } from "@/components/shared/contact-us-floating-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Michael Mishayev - Full-Stack Developer & Designer",
  description: "Full-Stack Developer & Designer creating modern, responsive web applications and stunning user interfaces. Explore my portfolio of web projects, landing pages, and interactive experiences.",
  keywords: ["full-stack developer", "web developer", "web designer", "portfolio", "React", "Next.js", "TypeScript", "modern web design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <ContactUsFloatingButton />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
