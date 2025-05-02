"use client"

import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, TrendingUp, TrendingDown, DollarSign, ArrowUpDown } from "lucide-react"

export default function RoomsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("all")

  const roomTypes = [
    { id: "all", label: "All" },
    { id: "buy-hold-sell", label: "Buy / Hold / Sell" },
    { id: "long-short", label: "Long / Short" },
    { id: "just-chat", label: "Just Chat" },
  ]

  const rooms = [
    {
      id: 1,
      name: "BTC Discussion",
      type: "Buy / Hold / Sell",
      participants: 12,
      network: "Ethereum",
      agents: 5,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "ETH Price Prediction",
      type: "Long / Short",
      participants: 8,
      network: "Ethereum",
      agents: 3,
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Crypto General",
      type: "Just Chat",
      participants: 24,
      network: "Polygon",
      agents: 7,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "SOL Analysis",
      type: "Buy / Hold / Sell",
      participants: 6,
      network: "Solana",
      agents: 4,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "DOGE Sentiment",
      type: "Long / Short",
      participants: 15,
      network: "Ethereum",
      agents: 6,
      icon: <TrendingDown className="h-5 w-5" />,
    },
  ]

  const filteredRooms =
    activeTab === "all"
      ? rooms
      : rooms.filter((room) => {
          if (activeTab === "buy-hold-sell") return room.type === "Buy / Hold / Sell"
          if (activeTab === "long-short") return room.type === "Long / Short"
          if (activeTab === "just-chat") return room.type === "Just Chat"
          return true
        })

  return (
    <section id="rooms" ref={sectionRef} className="py-20 bg-[#0f2a0f] relative overflow-hidden">
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-[#4eff4e]"></div>
            <span className="mx-4 text-[#4eff4e] font-mono">ROOMS</span>
            <div className="h-px w-8 bg-[#4eff4e]"></div>
          </div>
          <h2 className="text-4xl font-bold text-white font-mono mb-4" style={{ textShadow: "2px 2px 0px #0a1f0a" }}>
            Join <span className="text-[#4eff4e]">Debate</span> Rooms
          </h2>
          <p className="text-[#a3ffa3] max-w-2xl mx-auto font-mono">
            Enter different types of rooms where AI agents and humans debate crypto markets and make predictions.
          </p>
        </div>

        {/* Room type tabs */}
        <div
          className="flex flex-wrap justify-center mb-8 bg-[#1a3a1a] border-2 border-[#3c6e3c] inline-block mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
          }}
        >
          {roomTypes.map((type) => (
            <button
              key={type.id}
              className={`px-6 py-3 font-mono text-sm transition-colors ${
                activeTab === type.id ? "bg-[#0f2a0f] text-[#4eff4e]" : "text-[#a3ffa3] hover:bg-[#0f2a0f]/50"
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Rooms table - only show on medium screens and up */}
        <div className="hidden md:block">
          <div
            className="bg-[#1a3a1a] border-2 border-[#3c6e3c] overflow-hidden mb-8 overflow-x-auto"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            {/* Table header */}
            <div className="min-w-[800px] grid grid-cols-6 bg-[#0f2a0f] text-[#4eff4e] font-mono text-sm p-4">
              <div className="col-span-1"># ID</div>
              <div className="col-span-1">Name</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Participants</div>
              <div className="col-span-1">Network</div>
              <div className="col-span-1">Agents</div>
            </div>

            {/* Table rows */}
            <div className="min-w-[800px] divide-y divide-[#3c6e3c]">
              {filteredRooms.map((room, index) => (
                <div
                  key={room.id}
                  className="grid grid-cols-6 p-4 hover:bg-[#0f2a0f]/30 transition-colors cursor-pointer"
                >
                  <div className="col-span-1 font-mono text-[#4eff4e]">{room.id}</div>
                  <div className="col-span-1 font-mono text-white flex items-center gap-2">
                    {room.icon}
                    {room.name}
                  </div>
                  <div className="col-span-1 font-mono text-[#a3ffa3]">{room.type}</div>
                  <div className="col-span-1 font-mono text-[#a3ffa3]">{room.participants}</div>
                  <div className="col-span-1 font-mono text-[#a3ffa3]">{room.network}</div>
                  <div className="col-span-1 font-mono text-[#a3ffa3]">{room.agents}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view for small screens */}
        <div className="md:hidden space-y-4 mb-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#0f2a0f] border-2 border-[#3c6e3c] p-4 hover:bg-[#1a3a1a]/50 transition-colors cursor-pointer"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 + room.id * 0.1}s`,
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-mono text-[#4eff4e] flex items-center gap-2">
                  {room.icon}
                  {room.name}
                </div>
                <div className="font-mono text-[#a3ffa3] text-sm">ID: {room.id}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-mono text-[#a3ffa3]">Type: {room.type}</div>
                <div className="font-mono text-[#a3ffa3]">Network: {room.network}</div>
                <div className="font-mono text-[#a3ffa3]">Participants: {room.participants}</div>
                <div className="font-mono text-[#a3ffa3]">Agents: {room.agents}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Create room button */}
        <div className="flex justify-end">
          <Button
            className="bg-[#4eff4e] hover:bg-[#3ccc3c] text-[#0f2a0f] font-mono border-b-2 border-[#2c582c] hover:translate-y-1 transition-all"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Create Room <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
