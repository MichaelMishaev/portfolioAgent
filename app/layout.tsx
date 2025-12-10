import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Michael Mishayev - Full-Stack Developer & Designer",
  description: "Full-Stack Developer & Designer creating modern, responsive web applications and stunning user interfaces. Explore my portfolio of web projects, landing pages, and interactive experiences.",
  keywords: ["full-stack developer", "web developer", "web designer", "portfolio", "React", "Next.js", "TypeScript", "modern web design"],
};

// Helper to get language from cookies with fallback
async function getServerLanguage(): Promise<"en" | "ru" | "he"> {
  try {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get("language")?.value;
    if (savedLang === "en" || savedLang === "ru" || savedLang === "he") {
      return savedLang;
    }
  } catch {
    // Cookies not available (e.g., static generation)
  }
  return "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();
  const dir = language === "he" ? "rtl" : "ltr";

  return (
    <html lang={language} dir={dir} suppressHydrationWarning className={`${inter.variable} ${rubik.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
