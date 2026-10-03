import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { AppShell } from "@/components/app-shell";
import { env } from "@/lib/env";
import "./globals.css";

// Force env validation on startup
void env;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartograph",
  description: "Dependency map and codebase analysis",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value || "system";

  let htmlClass = "";
  if (themeCookie === "dark") {
    htmlClass = "dark";
  } else if (themeCookie === "light") {
    htmlClass = "light";
  }

  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('theme') || '${themeCookie}';
        var root = document.documentElement;
        root.classList.remove('light', 'dark');
        if (stored === 'dark') {
          root.classList.add('dark');
        } else if (stored === 'light') {
          root.classList.add('light');
        } else {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark');
          } else {
            root.classList.add('light');
          }
        }
      } catch (e) {}
    })();
  `;

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${htmlClass} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="h-full flex flex-col font-sans">
          <AppShell>{children}</AppShell>
        </body>
      </html>
    </ClerkProvider>
  );
}