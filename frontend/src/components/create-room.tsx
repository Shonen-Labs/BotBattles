"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DollarSign, MessageSquare, TrendingDown, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal } from "./ui/dropdown-menu";

interface createRoomProps {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
}

const networks = ["Ethereum", "Solana", "Polygon", "Bitcoin"];
const typeRoom = ["All", "Buy / Hold / Sell", "Long / Short", "Just Chat"];

function CreateRoom({
    isOpen,
    onClose,
}: createRoomProps) {
    const [ nameRoom, setNameRoom ] = useState('');
    const [ roomType, setRoomType ] = useState('');
    const [ network, setNetwork ] = useState('');
    const [ numberAgents, setNumberAgents ] = useState('');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-[#2c582c]/50 fixed inset-0" />
                <DialogContent className="bg-[#3ccc3c]/50 fixed top-[50%] left-[50%] w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg px-4 py-4">
                    <div className="">
                        <h1 className="font-extrabold text-2xl">Create room</h1>
                        <p className="mb-8">Complete the information to create your room</p>
                        <form className="mb-4 w-full flex flex-col items-center">
                            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                <div className="col-span-2 col-start-1 flex flex-col">
                                    <label className="font-bold">Name</label>
                                    <input type="text" placeholder="Enter room name" className="w-full h-10 border rounded px-2" />
                                </div>
                                <div className="col-start-1 row-start-2">
                                    <label className="font-bold">Network</label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full">
                                            <Button className="w-full">
                                                Select your network
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuContent className="min-w-[180px] bg-white rounded-md shadow-md p-2 border border-gray-200">
                                                {networks.map((network) => (
                                                    <DropdownMenuItem key={network} className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer">
                                                        {network}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenu>
                                </div>
                                <div className="col-start-2 row-start-2">
                                    <label className="font-bold">Room type</label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full">
                                            <Button  variant="default" className="w-full">
                                                Select your type room
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuContent className="min-w-[180px] bg-white rounded-md shadow-md p-2 border border-gray-200">
                                                {typeRoom.map((room) => (
                                                    <DropdownMenuItem key={room} className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer">
                                                        {room}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenu>
                                </div>
                                <div className="col-span-2 col-start-1 row-start-3">
                                    <label className="font-bold">Required Number of Agents</label>
                                    <input type="number" placeholder="Enter number of agents" className="w-full h-10 border rounded px-2" />
                                </div>
                                <div className="col-span-2 col-start-1 row-start-4">
                                    <label>Choose your icon</label>
                                    <div className="flex flex-row gap-12 justify-center items-center mt-4">
                                        <Button variant="ghost" className="border border-white rounded-lg w-18 h-18">
                                            <TrendingUp className="h-15 w-15" />
                                        </Button>
                                        <Button variant="ghost" className="border border-white rounded-lg w-18 h-18">
                                            <MessageSquare className="h-15 w-15" />
                                        </Button>
                                        <Button variant="ghost" className="border border-white rounded-lg w-18 h-18">
                                            <DollarSign className="h-15 w-15" />
                                        </Button>
                                        <Button variant="ghost" className="border border-white rounded-lg w-18 h-18">
                                            <TrendingDown className="h-15 w-15" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 ml-auto flex flex-row gap-4">
                                <Button variant="outline" className="text-black">Cancel</Button>
                                <Button variant="secondary" className="bg-[#2c582c] text-white hover:bg-[#3ccc3c] hover:font-bold">Create Room</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default CreateRoom;