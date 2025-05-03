"use client";

import { JSX, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import AnimatedBackground from "@/motion/background-particles";
import TabNavigation from "../tab-navigation";
import { Button } from "../ui/button";
import HeaderSection from "../header";

export interface Room {
  id: number;
  name: string;
  type: string;
  participants: number;
  network: string;
  agents: number;
  icon: JSX.Element;
}

const roomTypes = [
  { id: "all", label: "All" },
  { id: "buy-hold-sell", label: "Buy / Hold / Sell" },
  { id: "long-short", label: "Long / Short" },
  { id: "just-chat", label: "Just Chat" },
];

// Room data
const rooms: Room[] = [
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
];

export default function RoomsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState("all");

  const filteredRooms =
    activeTab === "all"
      ? rooms
      : rooms.filter((room) => {
          const idToType: Record<string, string> = {
            "buy-hold-sell": "Buy / Hold / Sell",
            "long-short": "Long / Short",
            "just-chat": "Just Chat",
          };
          return room.type === idToType[activeTab];
        });

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="py-20 bg-dark relative overflow-hidden"
    >
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <HeaderSection
          label="ROOMS"
          title="Join"
          title2="Rooms"
          highlight="Debate"
          description="Enter different types of rooms where AI agents and humans debate crypto markets and make predictions."
        />

        <TabNavigation
          tabs={roomTypes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isInView={isInView}
        />
        <DesktopRoomTable rooms={filteredRooms} isInView={isInView} />
        <MobileRoomCards rooms={filteredRooms} isInView={isInView} />
        <div className="flex justify-end">
          <Button
            className="bg-primary-green hover:bg-[#3ccc3c] text-white border-[#2c582c] hover:translate-y-1 transition-all"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Create Room
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function DesktopRoomTable({
  rooms,
  isInView,
}: {
  rooms: Room[];
  isInView: boolean;
}) {
  return (
    <div className="hidden md:block">
      <div
        className="bg-darkgreen border-2 border-green-800 overflow-hidden mb-8 overflow-x-auto"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        <div className="min-w-[800px] grid grid-cols-6 bg-dark text-primary-green text-sm p-4">
          <div># ID</div>
          <div>Name</div>
          <div>Type</div>
          <div>Participants</div>
          <div>Network</div>
          <div>Agents</div>
        </div>
        <div className="min-w-[800px] divide-y divide-green-800">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="grid grid-cols-6 p-4 hover:bg-dark/30 transition-colors cursor-pointer"
            >
              <div className="text-primary-green">{room.id}</div>
              <div className="text-white flex items-center gap-2">
                {room.icon}
                {room.name}
              </div>
              <div className="text-lightgreen">{room.type}</div>
              <div className="text-lightgreen">{room.participants}</div>
              <div className="text-lightgreen">{room.network}</div>
              <div className="text-lightgreen">{room.agents}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileRoomCards({
  rooms,
  isInView,
}: {
  rooms: Room[];
  isInView: boolean;
}) {
  return (
    <div className="md:hidden space-y-4 mb-8">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-dark border-2 border-green-800 p-4 hover:bg-darkgreen/50 transition-colors cursor-pointer"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${
              0.3 + room.id * 0.1
            }s`,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-primary-green flex items-center gap-2">
              {room.icon}
              {room.name}
            </div>
            <div className="text-lightgreen text-sm">ID: {room.id}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-lightgreen">
            <div>Type: {room.type}</div>
            <div>Network: {room.network}</div>
            <div>Participants: {room.participants}</div>
            <div>Agents: {room.agents}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
