"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOutIcon, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWalletContext } from "./wallet-provider";
import AnimationWrapper from "../motion/animation-wrapper";
import WalletConnectModal from "./wallet-connect-modal";
import WalletDisconnectModal from "./wallet-disconnect";
import CopyButton from "./copy-buton";
import { Button } from "./ui/button";

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

  const navLinks = [
    { href: "#rooms", name: "Rooms" },
    { href: "#agents", name: "Agents" },
    { href: "#how-it-works", name: "PvPvAI" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f2a0f]/90 backdrop-blur-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto pl-4 pr-4 lg:px-20 flex items-center justify-between">
          <AnimationWrapper variant="slideRight">
            <Link href="/">
              <h1
                className="text-2xl md:text-4xl font-bold text-white font-mono leading-tight tracking-wider"
                style={{ textShadow: "3px 3px 0px #0f2a0f" }}
              >
                <span className="text-[#4eff4e]">PVP</span>V
                <span className="text-[#4eff4e]">AI</span>
              </h1>
            </Link>
          </AnimationWrapper>

          <div className="flex items-center justify-center gap-2">
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
                  <Button
                    className="bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono border-b-2 border-[#2c582c] hover:translate-y-1 transition-all"
                    onClick={handleConnectWallet}
                  >
                    Connect Wallet
                  </Button>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <div
                      onClick={handleWalletClick}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gray-800 bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] cursor-pointer hover:border-gray-600 transition-colors"
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
                          <ChevronDown className="w-4 h-4 text-white cursor-pointer" />
                        </span>
                      </button>

                      <CopyButton
                        copyText={account || ""}
                        className="cursor-pointer"
                      />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md  border-2 border-[#3c6e3c] shadow-lg overflow-hidden">
                        <div className="bg-[#0f2a0f] p-2 space-y-4 text-[#a3ffa3] font-mono">
                          <button
                            onClick={handleWalletClick}
                            className="hover:text-[#baf9ba] text-[#4eff4e] cursor-pointer flex items-center gap-2"
                          >
                            <LogOutIcon className="h-4 w-4" />
                            Disconnect
                          </button>
                          <Link
                            href="#"
                            className=" text-[#4eff4e] hover:text-[#baf9ba] cursor-pointer flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            View Profile
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimationWrapper>
            </div>
          </div>
          {/* Mobile Wallet + Menu */}
          <div className="md:hidden flex items-center">
            <AnimationWrapper variant="slideLeft">
              {!account ? (
                <Button
                  className="bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono border-b-2 border-[#2c582c] hover:translate-y-1 transition-all"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={handleWalletClick}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gray-800 bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] cursor-pointer hover:border-gray-600 transition-colors"
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
                        <ChevronDown className="w-4 h-4 text-white cursor-pointer" />
                      </span>
                    </button>

                    <CopyButton
                      copyText={account || ""}
                      className="cursor-pointer"
                    />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md  border-2 border-[#3c6e3c] shadow-lg overflow-hidden">
                      <div className="bg-[#0f2a0f] p-2 space-y-4 text-[#a3ffa3] font-mono">
                        <button
                          onClick={handleWalletClick}
                          className="hover:text-[#baf9ba] text-[#4eff4e] cursor-pointer flex items-center gap-2"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          Disconnect
                        </button>
                        <Link
                          href="#"
                          className=" text-[#4eff4e] hover:text-[#baf9ba] cursor-pointer flex items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          View Profile
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimationWrapper>

            <Menu onClick={toggleMenu} className="ml-2" />
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
