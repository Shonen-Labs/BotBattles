use core::hash::{HashStateExTrait, HashStateTrait};
use core::poseidon::{PoseidonTrait, poseidon_hash_span};
use openzeppelin::access::accesscontrol::AccessControlComponent;
use openzeppelin::access::ownable::OwnableComponent;
use openzeppelin::introspection::src5::SRC5Component;
use openzeppelin::token::erc20::interface::{
    ERC20ABIDispatcher, ERC20ABIDispatcherTrait, IERC20Dispatcher, IERC20DispatcherTrait,
    IERC20MetadataDispatcher, IERC20MetadataDispatcherTrait,
};
use starknet::storage::{
    Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    Vec, VecTrait,
};
use starknet::{
    ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    get_contract_address,
};

#[starknet::interface]
pub trait IBetting<TContractState> {
    fn place_bet(ref self: TContractState, room_id: u256, agent_id: u256, amount: u256);
    fn resolve_bet(ref self: TContractState, room_id: u256, winner: ContractAddress);
    fn get_bet_amount(self: @TContractState, room_id: u256) -> u256;
    fn withdraw_winnings(ref self: TContractState, room_id: u256, amount: u256);

    fn create_pool(ref self: TContractState);
}

#[starknet::contract]
mod Betting {
    use super::*;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);


    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;

    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;

    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        bets_total_amount: Map<(u256, u256), u256>, // room id, agent id, amount in the pool
        room: Map<u256, Battle>, // room if to battle details
        token_addr: ContractAddress,
        room_players: Map<
            u256, Vec<ContractAddress>,
        >, // a room id to the list of players in the room 
        player_stake: Map<
            (ContractAddress, u256, u256), u256,
        >, // (contract adddress of the payer that stakes and the room id with the agent he staekd on) to the amount the player stakes
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        BetPlaced: BetPlaced,
        BetResolved: BetResolved,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        FeesCollected: FeesCollected,
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

    #[derive(Drop, starknet::Event)]
    struct FeesCollected {
        fee_type: felt252,
        agent_id: u256,
        room_id: u256,
        amount: u256,
    }

    const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");


    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, token_addr: ContractAddress) {
        self.ownable.initializer(owner);
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(ADMIN_ROLE, owner);
        self.token_addr.write(token_addr);
    }

    #[derive(Copy, Drop, Serde, Hash, starknet::Store)]
    pub struct Battle {
        pub first_agent_id: u256,
        pub second_agent_id: u256,
    }

    #[abi(embed_v0)]
    impl BettingImpl of IBetting<ContractState> {
        fn place_bet(ref self: ContractState, room_id: u256, agent_id: u256, amount: u256) {
            let caller = get_caller_address();
            assert(amount > 0, 'amount to stake cannot be 0');
            // assert room exists
            let get_room = self.room.entry(room_id).read();
            assert(get_room.first_agent_id > 0, 'room doesnt exists');

            let previous_amount: u256 = self.bets_total_amount.entry((room_id, agent_id)).read();

            self.bets_total_amount.entry((room_id, agent_id)).write(previous_amount + amount);

            // add the player to the room
            self.room_players.entry(room_id).push(caller);

            // record what the player has staked
            self.player_stake.entry((caller, room_id, agent_id)).write(amount);


            let caller = get_caller_address();
            let dispatcher = IERC20Dispatcher { contract_address: self.token_addr.read() };

            // Check balance and allowance
            let user_balance = dispatcher.balance_of(caller);
            assert(user_balance >= amount, 'Insufficient balance');

            let contract_address = get_contract_address();

            // approve the transfer
            dispatcher.approve(contract_address, amount);

            // Transfer the tokens
            dispatcher.transfer_from(caller, contract_address, amount);
        }

        fn resolve_bet(ref self: ContractState, room_id: u256, winner: ContractAddress) {}

        fn get_bet_amount(self: @ContractState, room_id: u256) -> u256 {
            1
        }

        fn withdraw_winnings(ref self: ContractState, room_id: u256, amount: u256) {}

        fn create_pool(ref self: ContractState) {}
    }

    #[external(v0)]
    fn set_winner(ref self: ContractState, room_id: u256, agent_id: u256, winner: felt252) -> u256 {
        256
    }
}
