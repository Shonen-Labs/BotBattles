#[starknet::contract]
mod Betting {

    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        bets: Map<(u256, u256), u256>, // (room id, agent id)
    }

    #[abi(embed_v0)]
    impl BettingImpl of super::BettingInterface<ContractState> {
        fn place_bet(ref self: ContractState, room_id: u256, agent_id: u256, amount: u256){
            // Check if the bet is valid
            assert!(amount > 0, "Bet amount must be greater than zero");
            // Store the bet in the storage
            self.bets.write((room_id, agent_id), amount);
            // Lock the tokens (this part is not implemented here)
            // You would typically call a token contract to lock the tokens
        }
        fn withdraw_winnings(ref self: ContractState, room_id: u256, agent_id: u256){
            // Check if the bet exists
            let bet_amount =  self.bets.entry((room_id, agent_id)).read();
            
            assert!(bet_amount, "No bet found for this room and agent");
            // Transfer the winnings to the winner (this part is not implemented here)
            // You would typically call a token contract to transfer the tokens
            // Remove the bet from storage
            self.bets.write((room_id, agent_id), 0);
        }
    }
}

#[starknet::interface]
pub trait BettingInterface<TContractState> {
    fn place_bet(ref self: TContractState, room_id: u256, agent_id: u256, amount: u256); // record bets, lock tokens
    fn withdraw_winnings(ref self: TContractState, room_id: u256, agent_id: u256); // transfer to winner
}