"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useWalletContext } from "./wallet-provider";
import AnimationWrapper from "@/motion/animation-wrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (wallet: string) => void;
}

export default function WalletConnectModal({
  isOpen,
  onClose,
}: WalletConnectModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { connectors, connectAsync } = useWalletContext();

  const handleSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  // ② On confirm, look up the connector object and call connectWallet
  const handleConfirm = async () => {
    if (!selectedWallet) return;

    const connector = connectors.find((c) => c.id === selectedWallet);
    if (!connector) {
      console.error("Connector not found:", selectedWallet);
      return;
    }

    try {
      await connectAsync({ connector }); // ■ await the wallet prompt
      onClose();
    } catch (err) {
      console.error("Wallet connection failed:", err); // ■ handle rejections
    }
  };

  // helper to get icon source
  function getIconSource(
    icon: string | { dark: string; light: string }
  ): string {
    if (typeof icon === "string") {
      return icon;
    } else {
      return icon.dark;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <DialogContent className="bg-[#0f2a0f] border-2 border-[#3c6e3c] text-white font-mono sm:max-w-md">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <DialogHeader>
                  <DialogTitle className="text-[#4eff4e] text-center text-xl mb-6">
                    Choose a wallet
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mb-6">
                  {connectors.map((wallet, index) => (
                    <AnimationWrapper
                      key={wallet?.id}
                      variant="slideRight"
                      delay={index * 0.1}
                    >
                      <button
                        className={`w-full flex items-center gap-3 p-3 rounded-sm border-2 transition-all duration-300 font-mono ${
                          selectedWallet === wallet.id
                            ? "border-[#4eff4e] bg-[#1a3a1a]"
                            : "border-[#3c6e3c] hover:border-[#4eff4e] hover:bg-[#1a3a1a]/50"
                        }`}
                        onClick={() => handleSelect(wallet.id)}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                          <Image
                            src={getIconSource(wallet.icon)}
                            alt={wallet.name}
                            width={30}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[#a3ffa3]">{wallet.name}</span>
                      </button>
                    </AnimationWrapper>
                  ))}
                </div>

                {/* ③ Confirmation button */}
                <AnimationWrapper variant="slideUp" delay={0.3}>
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedWallet}
                    className={`w-full py-3 rounded-sm font-mono border-[#4eff4e] border transition-all outline-none duration-300 ${
                      selectedWallet
                        ? "bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] border-[#2c582c]"
                        : "bg-transparent opacity-50 cursor-not-allowed text-white "
                    }`}
                  >
                    Connect
                  </button>
                </AnimationWrapper>
              </motion.div>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
