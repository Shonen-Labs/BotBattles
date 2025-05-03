"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOutIcon, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWalletContext } from "./wallet-provider";
import AnimationWrapper from "../motion/animation-wrapper";
import WalletConnectModal from "./wallet-connect-modal";
import CopyButton from "./copy-buton";
import { Button } from "./ui/button";
import { Close } from "./icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { account, connectWallet, disconnectWallet, connectors } =
    useWalletContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleWalletSelect = (walletId: string) => {
    const connector = connectors.find((c) => c.id === walletId);
    if (connector) connectWallet(connector);
    setIsConnectModalOpen(false);
  };

  const handleConnectWallet = () => setIsConnectModalOpen(true);

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const navLinks = [
    { href: "#rooms", name: "Rooms" },
    { href: "#agents", name: "Agents" },
    { href: "#how-it-works", name: "About" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark/90 backdrop-blur-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <AnimationWrapper variant="slideRight">
            <Link href="/">
              <h1 className="font-bold text-white tracking-wider">
                <span className="text-2xl md:hidden">
                  B<span className="text-primary-green">B</span>
                </span>

                <span className="hidden md:inline text-4xl">
                  BOT<span className="text-primary-green">BATTLES</span>
                </span>
              </h1>
            </Link>
          </AnimationWrapper>

          <div className="flex items-center gap-4">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lightgreen hover:text-green-500 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Wallet Section */}
            <div className="relative" ref={dropdownRef}>
              {!account ? (
                <Button
                  onClick={handleConnectWallet}
                  className="bg-primary-green hover:bg-green-600 text-white"
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="flex items-center gap-2 bg-primary-green text-dark px-3 py-2 rounded-md cursor-pointer border border-gray-700">
                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-green-600">
                    <Image
                      src="/avatar.jpg"
                      alt="Wallet"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-lightgreen text-nowrap">
                    {account.slice(0, 6)}…{account.slice(-4)}
                  </span>
                  <CopyButton copyText={account} />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                    className="ml-1 text-lightgreen"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transform transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Dropdown */}
              {isDropdownOpen && account && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-green-700 bg-dark shadow-lg">
                  <div className="p-3 space-y-3 text-primary-green">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDisconnect();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 hover:text-lightgreen"
                    >
                      <LogOutIcon className="w-4 h-4" />
                      Disconnect
                    </button>
                    <Link
                      href="#"
                      className="flex items-center gap-2 hover:text-lightgreen"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              {isMenuOpen ? (
                <Close onClick={toggleMenu} className="cursor-pointer" />
              ) : (
                <Menu onClick={toggleMenu} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-green-800 overflow-hidden mt-2"
            >
              <div className="px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-lightgreen hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <WalletConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSelect={handleWalletSelect}
      />
    </>
  );
}
