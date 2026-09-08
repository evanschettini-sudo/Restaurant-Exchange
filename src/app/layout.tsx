import type { Metadata, Viewport } from "next";

import { PwaRegister } from "@/components/pwa-register";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Restaurant Efficiency Market",
    template: "%s · Restaurant Efficiency Market",
  },
  description:
    "Buy and sell restaurant surplus or source urgent same-day inventory nearby.",
  applicationName: "Restaurant Efficiency Market",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "REM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#065f46",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
