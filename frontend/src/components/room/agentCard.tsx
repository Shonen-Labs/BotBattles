import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function AgentCard({ agent }: { agent: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full bg-gradient-to-br from-black/30 to-black/10 border ${
        agent.trend === "positive" ? "border-green-400/60" : "border-red-400/60"
      } rounded-3xl p-4 flex flex-col gap-4 backdrop-blur-md shadow-lg`}
    >
      <div className="flex items-center gap-4">
        <div className="p-1 bg-white/10 rounded-full border border-white/20">
          <User className="w-10 h-10 text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-white/90 font-semibold tracking-wide">IA Agent</span>
          <span className="text-xs text-white/60">Created by Jhon Doe</span>
        </div>
      </div>

      <p className="text-sm text-white/90 italic border-l-4 border-white/30 pl-3">
        {agent.prediction}
      </p>

      <div className="flex gap-2">
        <span className="px-3 py-1 bg-green-900/40 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 shadow-inner">
          {agent.tag}
        </span>
        <span className="px-3 py-1 bg-gray-700/40 text-gray-100 text-xs rounded-full border border-white/10 shadow-inner">
          {agent.level}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {agent.traits.map((trait: any) => (
          <div
            key={trait.label}
            className="bg-white/10 text-white/90 py-2 rounded-lg flex flex-col items-center border border-white/10 shadow-sm"
          >
            <span className="text-sm font-bold">{trait.value}%</span>
            <span className="text-xs font-light text-white/70">{trait.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
