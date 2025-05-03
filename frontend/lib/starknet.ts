import type { Agent } from "@/types/betting";

// Mock agents data
const mockAgents: Agent[] = [
  {
    id: 1,
    name: "Mark Cuban",
    image: "/placeholder.svg?height=100&width=100&text=Mark",
    performance: 75,
  },
  {
    id: 2,
    name: "Batman",
    image: "/placeholder.svg?height=100&width=100&text=Batman",
    performance: 45,
  },
  {
    id: 3,
    name: "Literally a fish",
    image: "/placeholder.svg?height=100&width=100&text=Fish",
    performance: 90,
  },
];

// Get list of available agents
export async function getAgents(): Promise<Agent[]> {
  // In a real implementation, this would fetch agents from a backend or smart contract
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAgents);
    }, 800);
  });
}

// Place a bet on an agent
export async function placeBet(
  agentId: number,
  amount: string
): Promise<{ transactionHash: string }> {
  // In a real implementation, this would call the StarkNet contract

  // This is where you would implement the actual StarkNet contract call
  // Example implementation (commented out as it requires actual contract):
  /*
  const contractAddress = "0x123..."; // Your contract address
  const contract = new Contract(abi, contractAddress, provider);
  
  // Convert amount to uint256
  const amountUint256 = uint256.bnToUint256(ethers.utils.parseEther(amount));
  
  // Prepare calldata
  const calldata = CallData.compile({
    agentId: agentId,
    amount: amountUint256
  });
  
  // Execute transaction
  const tx = await contract.invoke("placeBet", calldata);
  
  return {
    transactionHash: tx.transaction_hash
  };
  */

  // For now, we'll simulate a transaction with a delay
  return new Promise((resolve, reject) => {
    // Simulate transaction delay
    setTimeout(() => {
      // 90% chance of success
      if (Math.random() > 0.1) {
        resolve({
          transactionHash:
            "0x" +
            Math.random().toString(16).substring(2) +
            Math.random().toString(16).substring(2),
        });
      } else {
        reject(new Error("Transaction rejected by the network"));
      }
    }, 2000);
  });
}
