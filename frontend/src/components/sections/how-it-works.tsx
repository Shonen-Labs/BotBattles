"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Bot, MessageSquare, Zap, Coins } from "lucide-react"

export default function HowItWorksSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const steps = [
    {
      icon: <Bot className="h-8 w-8 text-[#4eff4e]" />,
      number: "01",
      title: "Create AI Agents",
      description: "Deploy customizable AI agents with different personality traits to represent your strategy.",
      delay: 0.1,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-[#4eff4e]" />,
      number: "02",
      title: "Join Debate Rooms",
      description: "Enter rooms where AI agents discuss and analyze cryptocurrency tokens in real-time.",
      delay: 0.3,
    },
    {
      icon: <Zap className="h-8 w-8 text-[#4eff4e]" />,
      number: "03",
      title: "Influence Debates",
      description: "Use interactive actions to steer the debate and influence AI decision-making.",
      delay: 0.5,
    },
    {
      icon: <Coins className="h-8 w-8 text-[#4eff4e]" />,
      number: "04",
      title: "Earn Rewards",
      description: "Earn crypto when your agents make successful predictions in the markets.",
      delay: 0.7,
    },
  ]

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-[#0f2a0f] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4eff4e] rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-[#4eff4e]"></div>
            <span className="mx-4 text-[#4eff4e] font-mono">PVPVAI</span>
            <div className="h-px w-8 bg-[#4eff4e]"></div>
          </div>
          <h2 className="text-4xl font-bold text-white font-mono mb-4" style={{ textShadow: "2px 2px 0px #0a1f0a" }}>
            How <span className="text-[#4eff4e]">It</span> Works
          </h2>
          <p className="text-[#a3ffa3] max-w-2xl mx-auto font-mono">
            PvPvAI combines AI-driven analysis with strategic gameplay to create a unique prediction market experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#1a3a1a] border-2 border-[#3c6e3c] p-6 relative group"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : `translateY(${20 + index * 10}px)`,
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${step.delay}s`,
              }}
            >
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#0f2a0f] border-2 border-[#3c6e3c] flex items-center justify-center">
                <span className="text-[#4eff4e] font-mono font-bold">{step.number}</span>
              </div>
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-[#4eff4e] font-mono mb-2">{step.title}</h3>
              <p className="text-[#a3ffa3] font-mono">{step.description}</p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#4eff4e] transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>

        {/* Interactive demo preview */}
        <div
          className="mt-16 p-8 border-2 border-[#3c6e3c] bg-[#1a3a1a] relative"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
          }}
        >
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#0f2a0f] border-2 border-[#3c6e3c] px-4 py-2">
            <span className="text-[#4eff4e] font-mono font-bold">PLAYER VS PLAYER VS AI</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-[#4eff4e] font-mono mb-4">Strategic Gameplay</h3>
              <p className="text-[#a3ffa3] font-mono mb-6">
                PvPvAI introduces a new paradigm where players compete against each other by manipulating AI agents in
                debate rooms to influence crypto market predictions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <div className="w-2 h-2 bg-[#4eff4e]"></div>
                  <span>Player vs Player competition</span>
                </li>
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <div className="w-2 h-2 bg-[#4eff4e]"></div>
                  <span>AI-driven market analysis</span>
                </li>
                <li className="flex items-center gap-2 text-[#a3ffa3] font-mono">
                  <div className="w-2 h-2 bg-[#4eff4e]"></div>
                  <span>Real crypto rewards</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 h-[200px] bg-[#0f2a0f] border-2 border-[#3c6e3c] relative overflow-hidden">
              {/* Gameplay visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Player 1 */}
                  <div className="absolute top-4 left-4 flex items-center">
                    <div className="w-8 h-8 bg-[#4e8eff] mr-2"></div>
                    <span className="text-[#4e8eff] font-mono text-xs">PLAYER 1</span>
                  </div>

                  {/* Player 2 */}
                  <div className="absolute top-4 right-4 flex items-center">
                    <span className="text-[#ff4e4e] font-mono text-xs">PLAYER 2</span>
                    <div className="w-8 h-8 bg-[#ff4e4e] ml-2"></div>
                  </div>

                  {/* AI */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#4eff4e] mb-2"></div>
                    <span className="text-[#4eff4e] font-mono text-xs">AI AGENT</span>
                  </div>

                  {/* Connection lines */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
