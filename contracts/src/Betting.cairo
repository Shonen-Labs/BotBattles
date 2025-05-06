use core::hash::{HashStateExTrait, HashStateTrait};
use core::poseidon::{PoseidonTrait, poseidon_hash_span};
use starknet::storage::{
    Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
};
use starknet::{ContractAddress, get_caller_address};

#[starknet::interface]
pub trait IBetting<TContractState> {
    fn place_bet(ref self: TContractState, room_id: u256, agent_id: u256, amount: u256) -> u256;
    fn resolve_bet(ref self: TContractState, room_id: u256, winner: ContractAddress);
    fn get_bet_amount(self: @TContractState, room_id: u256) -> u256;
    fn withdraw_winnings(ref self: TContractState, room_id: u256, amount: u256);
}

#[starknet::contract]
mod Betting {
    use super::*;

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        BetPlaced: BetPlaced,
        BetResolved: BetResolved,
    }

    #[derive(Drop, starknet::Event)]
    pub struct BetPlaced {
        room_id: felt252,
        player: ContractAddress,
        amount: felt252,
    }

    #[derive(Drop, starknet::Event)]
    pub struct BetResolved {
        room_id: felt252,
        winner: ContractAddress,
        amount: felt252,
    }

    #[storage]
    struct Storage {
        bets_total_amount: Map<(u256, u256), u256> // room id, agent id, amount in the pool
    }

    #[abi(embed_v0)]
    impl BettingImpl of IBetting<ContractState> {
        fn place_bet(ref self: ContractState, room_id: u256, agent_id: u256, amount: u256) -> u256 {
            1
        }

        fn resolve_bet(ref self: ContractState, room_id: u256, winner: ContractAddress) {
            
        }

        fn get_bet_amount(self: @ContractState, room_id: u256) -> u256 {
            1
        }

        fn withdraw_winnings(ref self: ContractState, room_id: u256, amount: u256) {
            
        }
        
    }

    #[external(v0)]
    fn set_winner(ref self: ContractState, room_id: u256, agent_id: u256, winner: felt252) -> u256 {
        256
    }
}
