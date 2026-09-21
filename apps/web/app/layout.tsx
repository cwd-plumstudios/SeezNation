import type { Metadata } from "next";
import { PlayerBar } from "@/components/player/PlayerBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeezNation",
  description: "SeezNation — music, lyrics, and releases.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white pb-24">
        {children}
        <PlayerBar />
      </body>
    </html>
  );
}
