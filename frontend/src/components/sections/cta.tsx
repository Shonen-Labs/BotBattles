"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export default function CtaSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 bg-[#1a3a1a] relative overflow-hidden">
      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#3c6e3c 1px, transparent 1px), linear-gradient(90deg, #3c6e3c 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating pixel blocks */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-[#2c582c] opacity-30 shadow-lg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-4xl mx-auto bg-[#0f2a0f] border-4 border-[#3c6e3c] p-8 md:p-12 text-center relative animate-pulse-glow"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1)" : "scale(0.9)",
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            boxShadow: "0 0 40px rgba(78, 255, 78, 0.2)",
          }}
        >
          {/* Pixel corners */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-[#4eff4e] animate-pixel-shift"></div>
          <div
            className="absolute top-0 right-0 w-8 h-8 bg-[#4eff4e] animate-pixel-shift"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-8 h-8 bg-[#4eff4e] animate-pixel-shift"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-8 h-8 bg-[#4eff4e] animate-pixel-shift"
            style={{ animationDelay: "0.8s" }}
          ></div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white font-mono mb-6 tracking-wider"
            style={{ textShadow: "3px 3px 0px #0a1f0a" }}
          >
            Ready to <span className="text-[#4eff4e]">Join</span>?
          </h2>
          <p className="text-[#a3ffa3] font-mono text-xl mb-8 max-w-2xl mx-auto">
            Connect your wallet to start deploying AI agents, joining debate rooms, and earning crypto rewards.
          </p>
          <Button className="bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono text-lg px-8 py-6 h-auto border-b-4 border-[#2c582c] hover:translate-y-1 hover:border-b-2 transition-all animate-color-cycle">
            Connect Wallet <Wallet className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
