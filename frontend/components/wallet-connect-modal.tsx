"use client";

import { useEffect, useRef } from "react";
import { X, Loader2, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import Link from "next/link";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectors: Connector[];
  onSelect: (connector: Connector) => void;
  isConnecting: boolean;
  connectionError: string | null;
}

export function WalletConnectModal({
  isOpen,
  onClose,
  connectors,
  onSelect,
  isConnecting,
  connectionError,
}: WalletConnectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen && !isConnecting) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, isConnecting]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isConnecting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, isConnecting]);

  // Get wallet icons based on connector id
  const getWalletIcon = (id: string) => {
    switch (id.toLowerCase()) {
      case "argentx":
        return "/placeholder.svg?height=40&width=40&text=ArgentX";
      case "braavos":
        return "/placeholder.svg?height=40&width=40&text=Braavos";
      default:
        return "/placeholder.svg?height=40&width=40";
    }
  };

  // List of recommended wallets to download if none are available
  const recommendedWallets = [
    {
      name: "ArgentX",
      description: "The most popular Starknet wallet",
      icon: "/placeholder.svg?height=40&width=40&text=ArgentX",
      url: "https://www.argent.xyz/argent-x/",
      chromeUrl:
        "https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb",
      firefoxUrl: "https://addons.mozilla.org/en-US/firefox/addon/argent-x/",
    },
    {
      name: "Braavos",
      description: "A secure and user-friendly Starknet wallet",
      icon: "/placeholder.svg?height=40&width=40&text=Braavos",
      url: "https://braavos.app/",
      chromeUrl:
        "https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
    },
  ];

  // Check if there are any available wallets
  const hasAvailableWallets =
    connectors &&
    connectors.length > 0 &&
    connectors.some((c) => c.available());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4 font-pixel">
      <div
        ref={modalRef}
        className="bg-gray-800 border-2 border-green-500 rounded-none shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
            {!isConnecting && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Connection error message */}
          {connectionError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 text-red-400 rounded-none text-sm">
              {connectionError}
            </div>
          )}

          {/* Loading state */}
          {isConnecting && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
              <p className="text-white text-center">Connecting to wallet...</p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Please confirm the connection in your wallet
              </p>
            </div>
          )}

          {/* Wallet list */}
          {!isConnecting && hasAvailableWallets ? (
            <div className="space-y-3 mt-4">
              <p className="text-sm text-gray-400 mb-2 px-4">
                Select a wallet to connect to this application:
              </p>
              <div className="max-h-[60vh] overflow-y-auto px-4 pb-4 -mx-4">
                {connectors.map(
                  (connector) =>
                    connector.available() && (
                      <button
                        key={connector.id || Math.random().toString()}
                        onClick={() => onSelect(connector)}
                        disabled={isConnecting}
                        className="flex items-center justify-between w-full p-4 border border-gray-700 rounded-none hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-3 last:mb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-none overflow-hidden bg-gray-900 flex items-center justify-center">
                            <Image
                              src={
                                getWalletIcon(connector.id || "") ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={connector.name || "Wallet"}
                              width={40}
                              height={40}
                            />
                          </div>
                          <span className="font-medium text-white">
                            {connector.name || "Wallet"}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-none bg-green-900/30 text-green-500">
                          Available
                        </span>
                      </button>
                    )
                )}
              </div>
            </div>
          ) : !isConnecting ? (
            <div className="max-h-[70vh] overflow-y-auto pb-4 -mx-6 px-6">
              <div className="py-4">
                <div className="text-center mb-6">
                  <div className="bg-green-900/30 rounded-none w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Starknet Wallets Detected
                  </h3>
                  <p className="text-gray-300 mb-2">
                    To use this application, you&lsquo;ll need to install a
                    Starknet wallet.
                  </p>
                  <p className="text-sm text-gray-400">
                    Choose one of the recommended wallets below:
                  </p>
                </div>

                <div className="space-y-4">
                  {recommendedWallets.map((wallet) => (
                    <div
                      key={wallet.name}
                      className="border border-gray-700 rounded-none overflow-hidden"
                    >
                      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                        <div className="w-10 h-10 rounded-none overflow-hidden bg-gray-900 flex items-center justify-center">
                          <Image
                            src={wallet.icon || "/placeholder.svg"}
                            alt={wallet.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {wallet.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {wallet.description}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-900 p-3 flex flex-wrap gap-2">
                        {wallet.chromeUrl && (
                          <Link
                            href={wallet.chromeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-none transition-colors text-sm"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                            Chrome
                          </Link>
                        )}
                        {wallet.firefoxUrl && (
                          <Link
                            href={wallet.firefoxUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-none transition-colors text-sm"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                            Firefox
                          </Link>
                        )}
                        <a
                          href={wallet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white rounded-none transition-colors text-sm ml-auto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Website
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-900 rounded-none border border-gray-700">
                  <h4 className="font-medium text-white mb-2">
                    After installing:
                  </h4>
                  <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2">
                    <li>Refresh this page</li>
                    <li>Click the &quot;Connect Wallet&quot; button again</li>
                    <li>
                      Follow the wallet&lsquo;s instructions to create or import
                      an account
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
