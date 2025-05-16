"use client";
import { getRoomById, Props } from "@/app/rooms/[id]/page";
import { BadgeEuro, ClockAlert, Radio, Users } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DebateHeader({ params }: Props) {
    const roomId = await getRoomById(params.id);
    
    if (!roomId) return notFound();
    return (
        <div className="col-span-5 col-start-1 border border-white/50 rounded p-3 flex justify-between">
            <div>
                <h1 className="text-2xl text-bold ">{roomId.name}</h1>
                <span>{roomId.network}</span>
            </div>
            <div className="flex flex-row gap-4 ml-auto">
                <span className="w-18 h-8 bg-green-700 rounded-md text-green-200 flex flex-row gap-1 justify-center items-center">
                    Live <Radio className="w-5 h-5" />
                </span>
                <span className="w-18 h-8 rounded-md text-green-200 flex flex-row gap-1 justify-center items-center">
                    <Users className="w-5 h-5" /> {roomId.participants}
                </span>
                <span className="w-18 h-8 rounded-md text-green-200 flex flex-row gap-1 justify-center items-center">
                    <BadgeEuro /> 12.5
                </span>
                <span className="w-24 h-8 rounded-md text-green-200 flex flex-row gap-1 justify-center items-center">
                    <ClockAlert /> 4h 11m
                </span>
            </div>
        </div>
    );
}
