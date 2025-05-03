"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { Bot, MessageSquare, Zap, Coins } from "lucide-react";
import HeaderSection from "../header";
import AnimatedBackground from "@/motion/background-particles";

interface Step {
  icon: JSX.Element;
  number: string;
  title: string;
  description: string;
  delay: number;
}

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const steps: Step[] = [
    {
      icon: <Bot className="h-8 w-8 text-primary-green" />,
      number: "01",
      title: "Create AI Agents",
      description:
        "Deploy customizable AI agents with different personality traits to represent your strategy.",
      delay: 0.1,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-green" />,
      number: "02",
      title: "Join Debate Rooms",
      description:
        "Enter rooms where AI agents discuss and analyze cryptocurrency tokens in real-time.",
      delay: 0.3,
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-green" />,
      number: "03",
      title: "Influence Debates",
      description:
        "Use interactive actions to steer the debate and influence AI decision-making.",
      delay: 0.5,
    },
    {
      icon: <Coins className="h-8 w-8 text-primary-green" />,
      number: "04",
      title: "Earn Rewards",
      description:
        "Earn crypto when your agents make successful predictions in the markets.",
      delay: 0.7,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 bg-dark relative overflow-hidden"
    >
      <AnimatedBackground />
      <div className="container mx-auto px-4 relative z-10">
        <HeaderSection
          label="BotBattles"
          title="How"
          title2="Works"
          highlight="It"
          description="BotBattles combines AI-driven analysis with strategic gameplay to create a unique prediction market experience."
          marginBottom="mb-16"
        />
        {/* ✅ Pass steps as prop */}
        <StepsGrid isInView={isInView} steps={steps} />
        <InteractiveDemo isInView={isInView} />
      </div>
    </section>
  );
}

// ✅ Accept steps as a prop
function StepsGrid({ isInView, steps }: { isInView: boolean; steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <StepCard
          key={step.number}
          step={step}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

function StepCard({
  step,
  index,
  isInView,
}: {
  step: Step;
  index: number;
  isInView: boolean;
}) {
  return (
    <div
      className="bg-darkgreen border-2 border-green-800 p-6 relative group"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translateY(0)"
          : `translateY(${20 + index * 10}px)`,
        transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${step.delay}s`,
      }}
    >
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-dark border-2 border-green-800 flex items-center justify-center">
        <span className="text-primary-green font-bold">{step.number}</span>
      </div>
      <div className="mb-4">{step.icon}</div>
      <h3 className="text-xl font-bold text-primary-green mb-2">
        {step.title}
      </h3>
      <p className="text-lightgreen">{step.description}</p>
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary-green transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

function InteractiveDemo({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="mt-16 p-8 border-2 border-green-800 bg-darkgreen relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
      }}
    >
      <div className="absolute -top-10 lg:-top-5 left-1/2 transform -translate-x-1/2 bg-dark border-2 border-green-800 px-4 py-2">
        <span className="text-primary-green font-bold">
          PLAYER VS PLAYER VS AI
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <TextContent />
        <GameplayVisualization />
      </div>
    </div>
  );
}

function TextContent() {
  return (
    <div className="w-full md:w-1/2">
      <h3 className="text-2xl font-bold text-primary-green mb-4">
        Strategic Gameplay
      </h3>
      <p className="text-lightgreen mb-6">
        BotBattles introduces a new paradigm where players compete against each
        other by manipulating AI agents in debate rooms to influence crypto
        market predictions.
      </p>
      <ul className="space-y-3">
        <FeatureItem text="Player vs Player competition" />
        <FeatureItem text="AI-driven market analysis" />
        <FeatureItem text="Real crypto rewards" />
      </ul>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-lightgreen">
      <div className="w-2 h-2 bg-primary-green" />
      <span>{text}</span>
    </li>
  );
}

function GameplayVisualization() {
  return (
    <div className="w-full md:w-1/2 h-[200px] bg-dark border-2 border-green-800 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <PlayerIndicator position="left" color="#4e8eff" label="PLAYER 1" />
          <PlayerIndicator position="right" color="#ff4e4e" label="PLAYER 2" />
          <AIIndicator />
          <ConnectionLines />
        </div>
      </div>
    </div>
  );
}

function PlayerIndicator({
  position,
  color,
  label,
}: {
  position: "left" | "right";
  color: string;
  label: string;
}) {
  const alignment = position === "left" ? "left-4" : "right-4";
  return (
    <div className={`absolute top-4 ${alignment} flex items-center`}>
      {position === "left" && (
        <div
          className={`w-8 h-8`}
          style={{ backgroundColor: color, marginRight: "0.5rem" }}
        />
      )}
      <span className="text-xs" style={{ color }}>
        {label}
      </span>
      {position === "right" && (
        <div
          className={`w-8 h-8`}
          style={{ backgroundColor: color, marginLeft: "0.5rem" }}
        />
      )}
    </div>
  );
}

function AIIndicator() {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <div className="w-12 h-12 bg-primary-green mb-2" />
      <span className="text-primary-green text-xs">AI AGENT</span>
    </div>
  );
}

function ConnectionLines() {
  return (
    <div className="absolute inset-0">
      <svg width="100%" height="100%" className="absolute inset-0">
        <line
          x1="12%"
          y1="12%"
          x2="50%"
          y2="80%"
          stroke="#4e8eff"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="88%"
          y1="12%"
          x2="50%"
          y2="80%"
          stroke="#ff4e4e"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
}
