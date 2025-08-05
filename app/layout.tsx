import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "./components/WalletProvider";

export const metadata: Metadata = {
  title: "Aptos Vibe Hack 2025 | Internal Company Hackathon",
  description: "Internal Aptos company-wide Vibe Coding hackathon. Submit your innovative DApp built with Vibe Coding on Aptos testnet. Labs + Foundation welcome!",
  keywords: "Aptos, hackathon, vibe coding, blockchain, Move, DApp, internal, company",
  authors: [{ name: "Aptos Labs" }],
  openGraph: {
    title: "Aptos Vibe Hack 2025",
    description: "Internal company hackathon - Build the best Vibe Coded DApp!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`} suppressHydrationWarning>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
