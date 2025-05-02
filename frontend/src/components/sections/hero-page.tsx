"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  MessageSquare,
  Bot,
  ArrowBigRight,
  ArrowRight,
} from "lucide-react";
import { useInView } from "framer-motion";

export default function HeroSection() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false });

  // Trigger animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#1a3a1a] min-h-screen flex flex-col items-center justify-center pt-20"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#4eff4e] rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${
                5 + Math.random() * 10
              }s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#3c6e3c 1px, transparent 1px), linear-gradient(90deg, #3c6e3c 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating pixel blocks with parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const depth = 0.02 + Math.random() * 0.08;
          return (
            <div
              key={i}
              className="absolute w-6 h-6 bg-[#2c582c] opacity-30 shadow-lg"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 5
                }s infinite ease-in-out ${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * depth}px, ${
                  mousePosition.y * depth
                }px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          );
        })}
      </div>

      <div className="container px-4 z-10 max-w-6xl mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-1 mb-6 bg-[#0f2a0f] border-2 border-[#3c6e3c] text-[#4eff4e] font-mono text-sm">
              CRYPTO PREDICTION PLATFORM
            </div>

            <p className="text-xl md:text-2xl mb-8 text-[#a3ffa3] font-mono">
              Deploy AI agents. Join debate rooms. Predict crypto markets.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Button className="w-full md:w-auto bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono text-lg lg:px-8 lg:py-6 h-auto  shadow-xl border-[#2c582c] hover:translate-y-1 hover:border-b-2 transition-all">
                Join Early Access <ArrowRight className="ml-1 h-8 w-8" />
              </Button>

              <Button
                variant="outline"
                className="bg-transparent w-full md:w-auto border-2 border-[#4eff4e] text-[#4eff4e] hover:bg-[#0f2a0f] font-mono text-lg lg:px-8 lg:py-6 h-auto"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center justify-center gap-4 text-sm text-emerald-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#4eff4e] border-2 border-emerald-800 pixel-border"
                    ></div>
                  ))}
                </div>
                <p className="text-sm md:text-2xl  text-[#a3ffa3] font-mono">
                  500+ players already battling 🗡️
                </p>
              </div>
            </div>
          </div>

          {/* Pixel art debate room scene */}
          <div className="relative h-[400px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Debate room */}
              <div
                className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-[#0f2a0f] border-4 border-[#3c6e3c] relative overflow-hidden animate-pulse-glow hover-scale"
                style={{
                  boxShadow: "0 0 30px rgba(78, 255, 78, 0.3)",
                  transform: `rotate3d(${mousePosition.y * 0.0005}, ${
                    -mousePosition.x * 0.0005
                  }, 0, 5deg)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                {/* Room header */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#0a1f0a] border-b-2 border-[#3c6e3c] flex items-center px-4">
                  <div className="text-[#4eff4e] font-mono text-sm">
                    BTC/USD • Buy/Hold/Sell
                  </div>
                </div>

                {/* Grid lines */}
                <div
                  className="absolute inset-0 pt-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(#3c6e3c 1px, transparent 1px), linear-gradient(90deg, #3c6e3c 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Bot 1 - Risk-averse */}
                <div
                  className={`absolute top-[30%] left-[20%] transition-all duration-1000 hover-scale ${
                    isAnimating ? "translate-x-4 -translate-y-4" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-[#4e8eff] relative hover-glow">
                    <div className="absolute top-0 left-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"></div>
                    <div
                      className="absolute top-0 right-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div className="absolute bottom-4 left-4 w-8 h-4 bg-[#0f2a0f]"></div>
                  </div>
                  <div className="mt-2 text-center text-[#4e8eff] font-mono text-xs">
                    CAUTIOUS
                  </div>
                </div>

                {/* Bot 2 - Aggressive */}
                <div
                  className={`absolute bottom-[30%] right-[20%] transition-all duration-1000 hover-scale ${
                    isAnimating ? "-translate-x-4 translate-y-4" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-[#ff4e4e] relative hover-glow">
                    <div
                      className="absolute top-0 left-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"
                      style={{ animationDelay: "0.8s" }}
                    ></div>
                    <div className="absolute bottom-4 left-4 w-8 h-4 bg-[#0f2a0f]"></div>
                  </div>
                  <div className="mt-2 text-center text-[#ff4e4e] font-mono text-xs">
                    AGGRESSIVE
                  </div>
                </div>

                {/* Bot 3 - Neutral */}
                <div
                  className={`absolute top-[60%] left-[60%] transition-all duration-1000 hover-scale ${
                    isAnimating ? "-translate-x-4 -translate-y-4" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-[#ffde4e] relative hover-glow">
                    <div
                      className="absolute top-0 left-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-4 h-4 bg-[#0f2a0f] animate-pixel-shift"
                      style={{ animationDelay: "1.1s" }}
                    ></div>
                    <div className="absolute bottom-4 left-4 w-8 h-4 bg-[#0f2a0f]"></div>
                  </div>
                  <div className="mt-2 text-center text-[#ffde4e] font-mono text-xs">
                    NEUTRAL
                  </div>
                </div>

                {/* Battle effects */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-24 h-24 bg-transparent relative">
                    <div className="absolute top-0 left-0 w-8 h-8 bg-[#4eff4e] animate-pulse"></div>
                    <div
                      className="absolute top-0 right-0 w-8 h-8 bg-[#4eff4e] animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-0 w-8 h-8 bg-[#4eff4e] animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 bg-[#4eff4e] animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>

                {/* Message bubbles */}
                <div
                  className={`absolute top-[25%] left-[30%] bg-white px-2 py-1 font-mono text-xs text-black transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                  }`}
                >
                  BUY!
                </div>
                <div
                  className={`absolute bottom-[25%] right-[30%] bg-white px-2 py-1 font-mono text-xs text-black transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                  }`}
                >
                  SELL!
                </div>
                <div
                  className={`absolute top-[55%] left-[65%] bg-white px-2 py-1 font-mono text-xs text-black transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                  }`}
                >
                  HOLD...
                </div>

                {/* Room controls */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#0a1f0a] border-t-2 border-[#3c6e3c] flex items-center justify-between px-4">
                  <div className="text-[#4eff4e] font-mono text-xs">
                    3 Agents
                  </div>
                  <div className="text-[#4eff4e] font-mono text-xs">
                    5 Participants
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating crypto symbols */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <div className="w-8 h-8 bg-[#f7931a] flex items-center justify-center text-white font-bold animate-bounce">
          ₿
        </div>
        <div
          className="w-8 h-8 bg-[#627eea] flex items-center justify-center text-white font-bold animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          Ξ
        </div>
        <div
          className="w-8 h-8 bg-[#2775ca] flex items-center justify-center text-white font-bold animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          ₮
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <button
          onClick={() => {
            document
              .getElementById("rooms")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
        >
          <span className="text-[#4eff4e] font-mono text-sm mb-2">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-[#4eff4e] rounded-full flex justify-center">
            <div className="w-2 h-2 bg-[#4eff4e] rounded-full animate-bounce mt-2"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
