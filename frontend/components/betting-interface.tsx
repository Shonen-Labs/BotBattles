"use client";

import { useState, useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import type { Agent } from "@/types/betting";
import { useBetting } from "@/hooks/use-betting";
import { getAgents } from "@/lib/starknet";

export default function BettingInterface() {
  const { address, isConnected } = useAccount();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [betAmount, setBetAmount] = useState<string>("0.01");
  const { placeBet, transactions, isLoading } = useBetting();

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agentData = await getAgents();
        setAgents(agentData);
      } catch (error) {
        console.error("Failed to load agents:", error);
      }
    };

    if (isConnected) {
      loadAgents();
    }
  }, [isConnected]);

  const handleBetSubmit = async () => {
    if (!selectedAgent) {
      alert("Please select an agent to place your bet.");
      return;
    }

    if (!betAmount || Number.parseFloat(betAmount) <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    try {
      await placeBet(selectedAgent.id, betAmount);
      setBetAmount("0.01");
    } catch (error) {
      console.error("Failed to place bet:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between mb-8 py-4 border-b border-gray-500">
        <h1 className="text-3xl font-bold text-green-400 font-pixel tracking-wider">
          PVPVAI ARENA
        </h1>
        <WalletConnectButton />
      </header>

      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-green-400 bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 font-pixel text-green-400">
            Connect Your Wallet
          </h2>
          <p className="mb-8 text-center max-w-md font-pixel text-gray-300">
            Connect your StarkNet wallet to start placing bets on AI agents.
          </p>
          <WalletConnectButton />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border-2 border-green-400 bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 font-pixel text-green-400">
                Place Your Bets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`cursor-pointer transition-all hover:scale-105 p-4 rounded-lg ${
                      selectedAgent?.id === agent.id
                        ? "border-2 border-green-400 bg-gray-600"
                        : "border border-gray-500 bg-gray-600"
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-500 mb-2">
                        <img
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium font-pixel text-white">
                        {agent.name}
                      </h3>
                      <div className="w-full h-2 bg-gray-500 mt-2 overflow-hidden rounded-full">
                        <div
                          className={`h-full ${
                            agent.performance > 66
                              ? "bg-green-400"
                              : agent.performance > 33
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          } rounded-full`}
                          style={{ width: `${agent.performance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedAgent && (
                <div className="mt-6 p-4 border border-gray-500 bg-gray-600 rounded-lg">
                  <h3 className="text-xl mb-4 font-pixel text-green-400">
                    Betting on: {selectedAgent.name}
                  </h3>

                  <div className="mb-4">
                    <label className="block mb-2 font-pixel text-gray-300">
                      Bet Amount (ETH)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        min="0.001"
                        step="0.001"
                        className={`
                          bg-gray-700 border-2 border-gray-500 
                          font-pixel text-white px-3 py-2 rounded
                          focus:border-green-400 focus:ring-1 focus:ring-green-400 
                          focus:outline-none
                          hover:border-gray-400
                          shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                          transition-all
                          w-full
                        `}
                      />
                      <button
                        onClick={handleBetSubmit}
                        disabled={isLoading}
                        className="
                          bg-green-400 hover:bg-green-500 
                          text-gray-900 font-pixel font-bold
                          px-5 py-2.5 
                          min-w-[120px]
                          rounded
                          disabled:opacity-70 disabled:cursor-not-allowed
                          transition-colors duration-150 cursor-pointer
                          shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                          hover:shadow-[0_4px_6px_rgba(0,0,0,0.25)]
                        "
                      >
                        {isLoading ? (
                          <span className="flex flex-col-reverse  items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Placing..</span>
                          </span>
                        ) : (
                          "Place Bet"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="border-2 border-green-400 bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 font-pixel text-green-400">
                Transaction History
              </h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.hash}
                      className={`p-3 border rounded-lg ${
                        tx.status === "confirmed"
                          ? "border-green-400 bg-gray-600"
                          : tx.status === "failed"
                          ? "border-red-400 bg-gray-600"
                          : "border-yellow-400 bg-gray-600"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {tx.status === "confirmed" ? (
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : tx.status === "failed" ? (
                          <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Loader2 className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5 animate-spin" />
                        )}

                        <div className="flex-1">
                          <p className="text-sm font-pixel text-white">
                            {tx.message}
                          </p>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-300 font-pixel">
                              {tx.status === "pending"
                                ? "Processing..."
                                : tx.status === "confirmed"
                                ? "Confirmed"
                                : "Failed"}
                            </p>
                            <p className="text-xs text-gray-300 font-pixel">
                              {new Date(tx.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          {tx.status === "confirmed" && (
                            <p className="text-xs font-mono text-gray-400 mt-1 truncate">
                              Tx: {tx.hash.substring(0, 10)}...
                              {tx.hash.substring(tx.hash.length - 6)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8 font-pixel">
                    No transactions yet. Place a bet to get started!
                  </p>
                )}
              </div>
            </div>

            <div className="border-2 border-green-400 bg-gray-700 p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 font-pixel text-green-400">
                Wallet Info
              </h2>
              <div className="space-y-2">
                <p className="font-mono text-sm break-all text-gray-300">
                  <span className="text-gray-400 font-pixel">Address:</span>{" "}
                  {address}
                </p>
                <p className="font-pixel text-gray-300">
                  <span className="text-gray-400">Network:</span> StarkNet
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
