"use client";

import { JSX, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Activity, Wallet } from "lucide-react";
import HeaderSection from "../header";
import TabNavigation from "../tab-navigation";
import { PixelGridOverlay } from "@/motion/pixel-grid-overlay";

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
      className="py-20 bg-darkgreen relative overflow-hidden"
    >
      <PixelGridOverlay />

      <div className="container mx-auto px-4 relative z-10">
        <HeaderSection
          label="AGENTS"
          title="Deploy"
          title2="Agents"
          highlight="AI"
          description="Create and customize AI agents with different personality traits to represent your strategy in debates."
          shadowColor="#0f2a0f"
        />

        {/* Agent type tabs */}
        <TabNavigation
          tabs={agentTypes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isInView={isInView}
        />

        {/* Agents table - desktop view */}
        <div className="hidden md:block">
          <div
            className="bg-dark border-2 border-green-800 overflow-hidden mb-8 overflow-x-auto"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            {/* Table header */}
            <div className="min-w-[800px] grid grid-cols-5 bg-darkgreen text-primary-green  text-sm p-4">
              <div className="col-span-1">Agent</div>
              <div className="col-span-1">Wallet Address</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Last Health Check</div>
              <div className="col-span-1">Lifetime Earnings</div>
            </div>

            {/* No agents message */}
            <div className="p-12 text-center  text-lightgreen">
              No agents found
            </div>
          </div>
        </div>

        {/* Agents table - mobile view */}
        <div className="md:hidden">
          <div
            className="bg-dark border-2 border-green-800 p-8 mb-8"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            {/* No agents message */}
            <div className="text-center  text-lightgreen">No agents found</div>
          </div>
        </div>

        {/* Agent creation section */}
        <div
          className="bg-dark border-2 border-green-800 p-8 mt-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <CreationContent />
            <AgentVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}

function CreationContent() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary-green mb-4">
        Create Your First Agent
      </h3>
      <p className="text-lightgreen mb-6">
        Deploy an AI agent with a unique personality to represent your strategy
        in crypto debates.
      </p>
      <ul className="space-y-3 mb-6">
        <FeatureListItem
          icon={<Bot className="h-5 w-5 text-primary-green" />}
          text="Choose from multiple personality types"
        />
        <FeatureListItem
          icon={<Activity className="h-5 w-5 text-primary-green" />}
          text="Train on your trading preferences"
        />
        <FeatureListItem
          icon={<Wallet className="h-5 w-5 text-primary-green" />}
          text="Earn crypto when your agent performs well"
        />
      </ul>
      <Button className="bg-primary-green hover:bg-[#3ccc3c] text-white border-[#2c582c] hover:translate-y-1 transition-all">
        Create New Agent <Plus className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

interface FeatureListItemProps {
  icon: JSX.Element;
  text: string;
}

function FeatureListItem({ icon, text }: FeatureListItemProps) {
  return (
    <li className="flex items-center gap-2 text-lightgreen">
      {icon}
      <span>{text}</span>
    </li>
  );
}

function AgentVisualization() {
  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary-green relative">
          <div className="absolute top-0 left-0 w-8 h-8 bg-dark" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-dark" />
          <div className="absolute bottom-8 left-8 w-16 h-8 bg-dark" />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-primary-green animate-ping opacity-75" />
          </div>
        </div>
        <AgentStats />
      </div>
    </div>
  );
}

function AgentStats() {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
      <StatItem value="0%" label="Win Rate" />
      <StatItem value="0.00" label="Earnings" />
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-primary-green text-xl font-bold">{value}</div>
      <div className="text-lightgreen text-xs">{label}</div>
    </div>
  );
}
