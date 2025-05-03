#[starknet::contract]
mod Betting {
    use contracts::interfaces::IBetting::BettingInterface;
    use starknet::storage::{
        Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
        Vec,
    };

    #[storage]
    struct Storage {
        bets: Map<(u256, u256), u256> // (room id, agent id)
    }

    #[abi(embed_v0)]
    impl BettingImpl of BettingInterface<ContractState> {
        fn place_bet(ref self: ContractState, room_id: u256, agent_id: u256, amount: u256) {
            // Check if the bet is valid
            assert!(amount > 0, "Bet amount must be greater than zero");
            // Store the bet in the storage
            self.bets.entry((room_id, agent_id)).write(amount);
            // Lock the tokens (this part is not implemented here)
        // You would typically call a token contract to lock the tokens
        }
        fn withdraw_winnings(ref self: ContractState, room_id: u256, agent_id: u256) {
            // Check if the bet exists
            let bet_amount = self.bets.entry((room_id, agent_id)).read();

            assert!(bet_amount >= 0, "No bet room and agent");

            // Transfer the winnings to the winner (this part is not implemented here)
            // You would typically call a token contract to transfer the tokens
            // Remove the bet from storage
            self.bets.entry((room_id, agent_id)).write(0);
        }
    }
}

