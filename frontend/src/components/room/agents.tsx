import AgentCard from "./agentCard";

export default function Agents() {
    return (
        <div className="w-full h-[80%] row-span-3 col-start-5 row-start-2 border border-white/50 rounded p-4 overflow-hidden">
            <h2 className="font-bold mb-6">Debate Agents</h2>
            <section className="flex flex-col gap-2 overflow-y-auto max-h-full">
                <AgentCard agent={{
                    prediction: "Polygon is showing signs of a bullish breakout.",
                    trend: "positive",
                    tag: "Analysis",
                    level: "Level 2",
                    traits: [
                        { label: "Logic", value: 65 },
                        { label: "Aggression", value: 45 },
                        { label: "Creativity", value: 80 },
                    ],
                }}
                />
                <AgentCard agent={{
                    prediction: "Polygon is showing strong bullish momentum.",
                    trend: "negative",
                    tag: "macro economics",
                    level: "Level 8",
                    traits: [
                        { label: "Logic", value: 55 },
                        { label: "Aggression", value: 80 },
                        { label: "Creativity", value: 40 },
                    ],
                }}
                />
            </section>
        </div>
    );
}
