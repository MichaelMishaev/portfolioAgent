import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminAuthProvider } from "@/components/admin/admin-auth-provider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Admin Dashboard - Discount Management",
  description: "Manage discount codes, view analytics, and track usage",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminAuthProvider>
            {children}
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
