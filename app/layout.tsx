import "./globals.css";
import type { Metadata } from "next";
import { BackgroundVideo } from "@/app/components/background-video";

export const metadata: Metadata = {
  title: "Meridian — Revenue Recovery Orchestrator",
  description: "Live Revenue Recovery Orchestrator & Real-Time Financial Heartbeat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="meridian" suppressHydrationWarning>
      <body className="bg-transparent text-foreground antialiased selection:bg-white selection:text-black relative min-h-screen">
        <BackgroundVideo />
        {children}
      </body>
    </html>
  );
}
