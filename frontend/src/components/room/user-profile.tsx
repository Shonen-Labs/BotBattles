"use client";
import { getRoomById, Props } from "@/app/rooms/[id]/page";
import { Clock3, Gift, HandCoins, TrendingUp, User } from "lucide-react";
import { notFound } from "next/navigation";

type PropsUser = {
    name: string;
    profession: string;
};

export default function UserProfile({ name, profession }: PropsUser) {
    return (
        <div className="row-span-3 col-start-1 row-start-2">
            <section className="w-full h-[80%] border border-white/50 rounded p-4">
                <h2 className="font-bold mb-6">Your Profile</h2>
                <div className="flex flex-row gap-4 items-center">
                    <User className="w-18 h-18 border border-white rounded-full p-1" />
                    <div className="flex flex-col gap-1">
                        <span className="">{name}</span>
                        <div className="flex flex-row gap-3 items-center">
                            <span className="w-24 h-8 bg-yellow-600 rounded-2xl text-white flex flex-row gap-1 justify-center items-center">
                                Level 2
                            </span>
                            <p className="text-sm text-gray-400">{profession}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-2 mt-4">
                    <div className="w-1/2 bg-yellow-600/50 flex flex-row gap-4 items-center rounded-lg p-2">
                        <TrendingUp className="w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-lg">1/1</span>
                            <span className="text-sm text-gray-400">Win rate</span>
                        </div>
                    </div>
                    <div className="w-1/2 bg-yellow-600/50 flex flex-row gap-4 items-center rounded-lg p-2">
                        <HandCoins className="w-6 h-6" />
                        <div className="flex flex-col">
                            <span className="text-lg">20.5</span>
                            <span className="text-sm text-gray-400">Total Earnings</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <span>Daily Challenge</span>
                    <div className="w-full bg-violet-900/30 border border-violet-800 rounded-lg p-2">
                        <span>The Visionary</span>
                        <p className="text-xs">
                            Win a crypto debate with +80% of the votes
                        </p>
                        <div className="mt-4 flex flex-row justify-between items-center">
                            <span className="text-xs flex flex-row gap-1 justify-center items-center">
                                <Gift className="w-4 h-4" /> 500 XP
                            </span>
                            <span className="text-xs flex flex-row gap-1 justify-center items-center">
                                <Clock3 className="w-4 h-4" /> 23h 58m
                            </span>
                        </div>
                        <div className="w-full h-4 mt-2 flex gap-2 items-center">
                            <div className="relative w-full h-4 bg-white rounded-full overflow-hidden border border-gray-300">
                                <div
                                    className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300"
                                    style={{ width: "5%" }}
                                ></div>
                            </div>
                            <p className="">0/1</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
