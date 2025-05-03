import { Metadata } from "next";
import "@/app/globals.css";
import { WalletProvider } from "@/components/wallet-provider";
import { StarknetProvider } from "@/components/starknet-provider";

export const metadata: Metadata = {
  title: "BotBattles – PvPvAI Crypto Prediction Market",
  description:
    "BotBattles is a gamified PvPvAI prediction market where players deploy customizable AI agents to debate crypto trends in real time. Influence AI behavior through interactive actions, place strategic bets, and compete in a dynamic, blockchain-integrated environment that fuses DeFi, social gaming, and AI-driven analysis.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-green text-lightgreen">
        <StarknetProvider>
          <WalletProvider>{children}</WalletProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
