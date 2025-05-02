"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface WalletDisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export default function WalletDisconnectModal({
  isOpen,
  onClose,
  onDisconnect,
}: WalletDisconnectModalProps) {
  const handleDisconnect = () => {
    // If the user is on a protected page that requires a connected wallet (e.g. a dashboard),
    // redirect them to the homepage before disconnecting to avoid access issues.
    // You can update the paths below based on your actual route structure.

    onDisconnect();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-[4px] flex items-center justify-center"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f2a0f] border-2 border-[#3c6e3c] text-white font-mono sm:max-w-md">
              <motion.div
                className="relative w-full max-w-sm rounded-2xl  p-6 "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex justify-center items-center gap-2 mt-8 w-full">
                  <Button
                    className="w-1/2 bg-transparent hover:text-[#0f2a0f] hover:bg-[#3ccc3c] text-white font-mono border-2 border-[#2c582c] hover:translate-y-1 transition-all"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="w-1/2 bg-[#4eff4e] hover:text-white hover:bg-transparent text-[#0f2a0f] font-mono border-2 border-[#2c582c] hover:translate-y-1 transition-all"
                    onClick={handleDisconnect}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
}
