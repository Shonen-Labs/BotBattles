"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { CircleUser, Send, ThumbsDown, ThumbsUp } from "lucide-react";

type Message = {
    id: number;
    sender: "user1" | "user2";
    text: string;
};

type chatProps = {
    user1: string;
    user2: string;
};

export default function Chat({ user1, user2 }: chatProps) {
    const [message, setMessage] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [currentSender, setCurrentSender] = useState<"user1" | "user2">("user1");
    const [countLike, setCountLike] = useState(0);
    const [countDislike, setCountDislike] = useState(0);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: message.length + 1,
            sender: currentSender,
            text: input.trim(),
        };
        setMessage([...message, newMessage]);
        setInput("");
        setCurrentSender(currentSender === "user1" ? "user2" : "user1");
    };

    return (
        <div className="col-span-3 row-span-2 col-start-2 row-start-2">
            <main className="h-[360px] w-full border border-white rounded overflow-hidden flex flex-col">
                <section className="w-full h-full mx-auto rounded p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Debate Chat</h2>
                    <div className="w-full flex-1 flex flex-col overflow-y-auto p-2 gap-4 border border-white/10 rounded-lg">
                        {message.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-3 rounded-2xl w-[75%] max-w-[75%] shadow-md transition-all duration-300 ${msg.sender === "user1" ? "bg-red-600/45 border border-red-700 self-start" : "bg-green-600/45 border border-green-400 self-end"}`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <CircleUser className="h-8 w-8 text-white/80" />
                                    <p className="text-md font-semibold text-white">
                                        {msg.sender === "user1" ? user1 : user2}
                                    </p>
                                </div>
                                <p className="mx-10 mb-2 text-sm text-white/90 leading-relaxed break-words">
                                    {msg.text}
                                </p>
                                <div className="flex items-center gap-4 text-white/70 text-xs mx-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setCountLike(countLike + 1)}
                                        className="flex items-center gap-1 hover:text-green-400"
                                    >
                                        <ThumbsUp /> {countLike}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setCountDislike(countDislike + 1)}
                                        className="flex items-center gap-1 hover:text-red-400"
                                    >
                                        <ThumbsDown /> {countDislike}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border rounded px-2 py-1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={handleSend}>
                            <Send />
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
