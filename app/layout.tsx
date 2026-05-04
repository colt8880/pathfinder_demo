import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/top-nav";
import WelcomeTour from "@/components/welcome-tour";

export const metadata: Metadata = {
  title: "Pathfinder",
  description: "AI-native specialist referral routing for health systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column", margin: 0 }}>
        <TopNav />
        <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>{children}</main>
        <WelcomeTour />
      </body>
    </html>
  );
}
