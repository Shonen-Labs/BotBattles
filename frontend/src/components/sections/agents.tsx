"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Activity, Wallet } from "lucide-react";

export default function AgentsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState("active");

  const agentTypes = [
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
  ];

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="py-20 bg-[#1a3a1a] relative overflow-hidden"
    >
      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#3c6e3c 1px, transparent 1px), linear-gradient(90deg, #3c6e3c 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-[#4eff4e]"></div>
            <span className="mx-4 text-[#4eff4e] font-mono">AGENTS</span>
            <div className="h-px w-8 bg-[#4eff4e]"></div>
          </div>
          <h2
            className="text-4xl font-bold text-white font-mono mb-4"
            style={{ textShadow: "2px 2px 0px #0f2a0f" }}
          >
            Deploy <span className="text-[#4eff4e]">AI</span> Agents
          </h2>
          <p className="text-[#a3ffa3] max-w-2xl mx-auto font-mono">
            Create and customize AI agents with different personality traits to
            represent your strategy in debates.
          </p>
        </div>

        {/* Agent type tabs */}
        <div
          className="flex flex-wrap justify-center mb-8 bg-[#0f2a0f] border-2 border-[#3c6e3c] mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
          }}
        >
          {agentTypes.map((type) => (
            <button
              key={type.id}
              className={`px-6 py-3 font-mono text-sm transition-colors ${
                activeTab === type.id
                  ? "bg-[#1a3a1a] text-[#4eff4e]"
                  : "text-[#a3ffa3] hover:bg-[#1a3a1a]/50"
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Agents table - desktop view */}
        <div className="hidden md:block">
          <div
            className="bg-[#0f2a0f] border-2 border-[#3c6e3c] overflow-hidden mb-8 overflow-x-auto"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            {/* Table header */}
            <div className="min-w-[800px] grid grid-cols-5 bg-[#1a3a1a] text-[#4eff4e] font-mono text-sm p-4">
              <div className="col-span-1">Agent</div>
              <div className="col-span-1">Wallet Address</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Last Health Check</div>
              <div className="col-span-1">Lifetime Earnings</div>
            </div>

            {/* No agents message */}
            <div className="p-12 text-center font-mono text-[#a3ffa3]">
              No agents found
            </div>
          </div>
        </div>

        {/* Agents table - mobile view */}
        <div className="md:hidden">
          <div
            className="bg-[#0f2a0f] border-2 border-[#3c6e3c] p-8 mb-8"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            {/* No agents message */}
            <div className="text-center font-mono text-[#a3ffa3]">
              No agents found
            </div>
          </div>
        </div>

        {/* Agent creation section */}
        <div
          className="bg-[#0f2a0f] border-2 border-[#3c6e3c] p-8 mt-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#4eff4e] font-mono mb-4">
                Create Your First Agent
              </h3>
              <p className="text-[#a3ffa3] font-mono mb-6">
                Deploy an AI agent with a unique personality to represent your
                strategy in crypto debates.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <Bot className="h-5 w-5 text-[#4eff4e]" />
                  <span>Choose from multiple personality types</span>
                </li>
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <Activity className="h-5 w-5 text-[#4eff4e]" />
                  <span>Train on your trading preferences</span>
                </li>
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <Wallet className="h-5 w-5 text-[#4eff4e]" />
                  <span>Earn crypto when your agent performs well</span>
                </li>
              </ul>
              <Button className="bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono border-b-2 border-[#2c582c] hover:translate-y-1 transition-all">
                Create New Agent <Plus className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative h-[300px]">
              {/* Agent visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-[#4eff4e] relative">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-[#0f2a0f]"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#0f2a0f]"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-8 bg-[#0f2a0f]"></div>

                  {/* Agent animation */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-[#4eff4e] animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Agent stats */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-[#4eff4e] font-mono text-xl font-bold">
                      0%
                    </div>
                    <div className="text-[#a3ffa3] font-mono text-xs">
                      Win Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4eff4e] font-mono text-xl font-bold">
                      0.00
                    </div>
                    <div className="text-[#a3ffa3] font-mono text-xs">
                      Earnings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
