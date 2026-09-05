import "./globals.css";
import type { Metadata } from "next";
import { BackgroundVideo } from "@/app/components/background-video";
import { ToastNotification } from "@/app/components/toast-notification";
import { AiCopilotDrawer } from "@/app/components/ai-copilot-drawer";

export const metadata: Metadata = {
  title: "Meridian — Revenue Recovery Orchestrator",
  description: "Live Revenue Recovery Orchestrator & Real-Time Financial Heartbeat",
  icons: {
    icon: [
      { url: "/meridian-logo.png", type: "image/png" },
    ],
    shortcut: "/meridian-logo.png",
    apple: "/meridian-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="meridian" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-transparent text-foreground antialiased selection:bg-white selection:text-black relative min-h-screen">
        <BackgroundVideo />
        <ToastNotification />
        {children}
        <AiCopilotDrawer />
      </body>
    </html>
  );
}
