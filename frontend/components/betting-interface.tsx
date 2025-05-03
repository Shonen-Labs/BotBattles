"use client";

import { useState, useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import { WalletConnectButton } from "@/components/wallet-connect-button";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
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
      // Reset amount after successful bet
      setBetAmount("0.01");
    } catch (error) {
      console.error("Failed to place bet:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between mb-8 py-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-green-500 font-pixel">
          PVPVAI ARENA
        </h1>
        <WalletConnectButton />
      </header>

      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-green-500 bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 font-pixel">
            Connect Your Wallet
          </h2>
          <p className="mb-8 text-center max-w-md font-pixel">
            Connect your StarkNet wallet to start placing bets on AI agents.
          </p>
          <WalletConnectButton />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border-2 border-green-500 bg-gray-800 p-6">
              <h2 className="text-2xl font-bold mb-6 font-pixel">
                Place Your Bets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`cursor-pointer transition-all hover:scale-105 p-4 ${
                      selectedAgent?.id === agent.id
                        ? "border-2 border-green-500"
                        : "border border-gray-700"
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-600 mb-2">
                        <img
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium font-pixel">
                        {agent.name}
                      </h3>
                      <div className="w-full h-2 bg-gray-700 mt-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            agent.performance > 66
                              ? "bg-green-500"
                              : agent.performance > 33
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${agent.performance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedAgent && (
                <div className="mt-6 p-4 border border-gray-700 bg-gray-900">
                  <h3 className="text-xl mb-4 font-pixel">
                    Betting on: {selectedAgent.name}
                  </h3>

                  <div className="mb-4">
                    <label className="block mb-2 font-pixel">
                      Bet Amount (ETH)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        min="0.001"
                        step="0.001"
                        className="bg-gray-700 border-gray-600 font-pixel"
                      />
                      <button
                        onClick={handleBetSubmit}
                        disabled={isLoading}
                        className="bg-green-500 hover:bg-green-600 text-black min-w-[120px] font-pixel"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Placing Bet
                          </>
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
            <div className="border-2 border-green-500 bg-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4 font-pixel">
                Transaction History
              </h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.hash}
                      className={`p-3 border ${
                        tx.status === "confirmed"
                          ? "border-green-500 bg-green-500/10"
                          : tx.status === "failed"
                          ? "border-red-500 bg-red-500/10"
                          : "border-yellow-500 bg-yellow-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {tx.status === "confirmed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : tx.status === "failed" ? (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Loader2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 animate-spin" />
                        )}

                        <div className="flex-1">
                          <p className="text-sm font-pixel">{tx.message}</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400 font-pixel">
                              {tx.status === "pending"
                                ? "Processing..."
                                : tx.status === "confirmed"
                                ? "Confirmed"
                                : "Failed"}
                            </p>
                            <p className="text-xs text-gray-400 font-pixel">
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

            <div className="border-2 border-green-500 bg-gray-800 p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 font-pixel">Wallet Info</h2>
              <div className="space-y-2">
                <p className="font-mono text-sm break-all">
                  <span className="text-gray-400 font-pixel">Address:</span>{" "}
                  {address}
                </p>
                <p className="font-pixel">
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
