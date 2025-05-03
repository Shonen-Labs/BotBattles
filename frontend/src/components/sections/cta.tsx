"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { PixelGridOverlay } from "@/motion/pixel-grid-overlay";
import AnimatedBackground from "@/motion/background-particles";

export default function CtaSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#1a3a1a] relative overflow-hidden"
    >
      <PixelGridOverlay />

      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-4xl mx-auto bg-dark border-4 border-green-800 p-8 md:p-12 text-center relative animate-pulse-glow"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1)" : "scale(0.9)",
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            boxShadow: "0 0 40px rgba(78, 255, 78, 0.2)",
          }}
        >
          {/* Pixel corners */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-primary-green animate-pixel-shift"></div>
          <div
            className="absolute top-0 right-0 w-8 h-8 bg-primary-green animate-pixel-shift"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-8 h-8 bg-primary-green animate-pixel-shift"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary-green animate-pixel-shift"
            style={{ animationDelay: "0.8s" }}
          ></div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white  mb-6 tracking-wider"
            style={{ textShadow: "3px 3px 0px #0a1f0a" }}
          >
            Ready to <span className="text-primary-green">Join</span>?
          </h2>
          <p className="text-lightgreen  text-xl mb-8 max-w-2xl mx-auto">
            Connect your wallet to start deploying AI agents, joining debate
            rooms, and earning crypto rewards.
          </p>
          <Button className="bg-primary-green hover:bg-green-800 text-white  text-lg px-6 py-4 h-auto  border-emerald-800 hover:translate-y-1 transition-all animate-color-cycle">
            Connect Wallet <Wallet className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
