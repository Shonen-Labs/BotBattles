"use client";
import Agents from "@/components/room/agents";
import Chat from "@/components/room/chat";
import DebateHeader from "@/components/room/debate-header";
import Desicion from "@/components/room/desicion";
import UserProfile from "@/components/room/user-profile";
import { rooms } from "@/components/sections/rooms";
import { Button } from "@/components/ui/button";
import {
  BadgeEuro,
  Clock3,
  ClockAlert,
  Gift,
  HandCoins,
  Radio,
  Send,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";

export type Props = {
  params: {
    id: string;
  };
};

export async function getRoomById(id: string) {
  console.log("Buscando sala: ", id);
  return rooms.find((room) => room.id === parseInt(id));
}

export default async function roomById({ params }: Props) {
  const roomId = await getRoomById(params.id);

  if (!roomId) return notFound();

  return (
    <div className="w-full min-h-screen bg-emerald-900 p-4 text-white">
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <DebateHeader params={{ id: params.id }} />
        <UserProfile name="Jhon Doe" profession="Trader" />
        <Chat user1="Jhon Doe" user2="user2" />
        <Agents />
        <Desicion />
      </div>
    </div>
  );
}
