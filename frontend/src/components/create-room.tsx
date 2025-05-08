"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { DollarSign, MessageSquare, TrendingDown, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "./ui/dialog";

interface createRoomProps {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
}

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
                                    <label className="font-bold">Room type</label>
                                    <input type="text" placeholder="Select type" className="w-full h-10 border rounded px-2" />
                                </div>
                                <div className="col-start-2 row-start-2">
                                    <label className="font-bold">Network</label>
                                    <input type="text" placeholder="Select network" className="w-full h-10 border rounded px-2" />
                                </div>
                                <div className="col-span-2 col-start-1 row-start-3">
                                    <label className="font-bold">Required Number of Agents</label>
                                    <input type="text" placeholder="Enter number of agents" className="w-full h-10 border rounded px-2" />
                                </div>
                            </div>
                            <Button variant="secondary" className="bg-[#2c582c] text-white hover:bg-[#3ccc3c] hover:font-bold mt-4 ml-auto">Create Room</Button>
                        </form>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default CreateRoom;