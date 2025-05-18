"use client";
import { getRoomById, Props } from "@/app/rooms/[id]/page";
import { BadgeEuro, ClockAlert, Radio, User, Users } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DebateHeader({ params }: Props) {
	const roomId = await getRoomById(params.id);

	if (!roomId) return notFound();
	return (
		<div className="w-full col-span-5 col-start-1 border border-white/50 rounded p-4 flex flex-col justify-between gap-2">
			<div className="w-full flex justify-between">
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
			<div className="w-full flex justify-between">
				<div className="flex flex-row gap-4 items-center">
					<User className="w-8 h-8 border border-white rounded-full p-1" />
					<div className="flex flex-col gap-1">
						<span className="">IA agent</span>
						<div className="flex flex-row gap-3 items-center">
							<span className="w-22 h-6 bg-green-900/80 text-green-400 rounded-2xl flex flex-row gap-1 justify-center items-center">
								Level 2
							</span>
							<p className="text-sm text-gray-400">Analysis</p>
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-4 items-center">
					<div className="flex flex-col gap-1">
						<span className="ml-auto">IA agent</span>
						<div className="flex flex-row gap-3 items-center">
							<p className="text-sm text-gray-400">Macro economics</p>
							<span className="w-22 h-6 bg-red-700/80 text-red-300 rounded-2xl flex flex-row gap-1 justify-center items-center">
								Level 8
							</span>
						</div>
					</div>
					<User className="w-8 h-8 border border-white rounded-full p-1" />
				</div>
			</div>
			<div className="w-full h-2 flex gap-2 items-center">
				<div className="relative w-full h-3 bg-white rounded-full overflow-hidden border border-gray-300">
					<div
						className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300"
						style={{ width: "5%" }}
					></div>
					<div
						className="absolute right-0 top-0 h-full bg-red-700/80 transition-all duration-300"
						style={{ width: "95%"}}
					>
					</div>
				</div>
			</div>
		</div>
	);
}
