"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWalletContext } from "./wallet-provider";
import AnimationWrapper from "../motion/animation-wrapper";
import WalletConnectModal from "./wallet-connect-modal";
import WalletDisconnectModal from "./wallet-disconnect";
import CopyButton from "./copy-buton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { account, connectWallet, disconnectWallet, connectors } =
    useWalletContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleWalletSelect = (walletId: string) => {
    const connector = connectors.find((c) => c.id === walletId);
    if (connector) {
      connectWallet(connector);
    }
    setIsConnectModalOpen(false);
  };

  const handleConnectWallet = () => {
    setIsConnectModalOpen(true);
  };

  const handleWalletClick = () => {
    setIsDisconnectModalOpen(true);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsDisconnectModalOpen(false);
  };

  const navLinks = [{ name: "FAQs", href: "/#faqs" }];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f2a0f]/90 backdrop-blur-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AnimationWrapper variant="slideRight">
            <Link href="/" className="text-white text-lg font-bold">
              logo
            </Link>
          </AnimationWrapper>

          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <AnimationWrapper variant="slideRight" key={link.name}>
                <Link
                  href={link.href}
                  className="mx-4 text-gray-200 hover:text-green-400 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              </AnimationWrapper>
            ))}
          </nav>

          {/* Desktop Wallet */}
          <div className="hidden md:block">
            <AnimationWrapper variant="slideLeft">
              {!account ? (
                <button
                  onClick={handleConnectWallet}
                  className="px-5 py-2 rounded-full bg-emerald-950 hover:bg-emerald-600 text-white font-semibold transition-colors"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={handleWalletClick}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full border-2 border-green-500 overflow-hidden">
                      <Image
                        src="/avatar.jpg"
                        alt="Wallet Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white font-medium">
                      {account.slice(0, 6)}…{account.slice(-4)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown();
                      }}
                      className="h-8 w-8 text-green-400 hover:text-white transition-transform"
                    >
                      <span
                        className={`inline-block transform transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown />
                      </span>
                    </button>

                    <div className="cursor-pointer">
                      <CopyButton copyText={account || ""} />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#0d0e24] border border-gray-800 overflow-hidden">
                      <div className="py-1">
                        <button
                          onClick={handleWalletClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                        >
                          Disconnect
                        </button>
                        <Link
                          href="#"
                          className="w-full block text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                        >
                          View Profile
                        </Link>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                          Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimationWrapper>
          </div>

          {/* Mobile Wallet + Menu */}
          <div className="md:hidden flex items-center">
            <AnimationWrapper variant="slideLeft">
              {!account ? (
                <button
                  onClick={handleConnectWallet}
                  className="px-4 py-1.5 mr-4 rounded-full bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
                >
                  Connect Wallet
                </button>
              ) : (
                <div
                  onClick={handleWalletClick}
                  className="flex items-center gap-2 px-2 py-1 mr-4 rounded-full bg-[#0d0e24] border border-gray-800 cursor-pointer"
                >
                  <div className="h-6 w-6 rounded-full border border-teal-500 overflow-hidden">
                    <Image
                      src="/icons/braavos.png"
                      alt="Wallet Avatar"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {account.slice(0, 6)}…{account.slice(-4)}
                  </span>
                </div>
              )}
            </AnimationWrapper>

            <CopyButton copyText={account || ""} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#0a0b1e]"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <AnimationWrapper
                    key={link.name}
                    variant="slideRight"
                    delay={index * 0.1}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </AnimationWrapper>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <WalletConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSelect={handleWalletSelect}
      />

      <WalletDisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onDisconnect={handleDisconnect}
      />
    </>
  );
}
