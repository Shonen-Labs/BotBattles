#[derive(Drop, Serde, starknet::Store)]
pub enum RoomStatus {
    #[default]
    BeforeBattle,
    BattleStarted,
    BattleEnded
}

#[derive(Drop, Serde, starknet::Store)]
struct Room {
    id: felt252,
    creator: starknet::ContractAddress,
    token: felt252,
    status: RoomStatus
}

#[starknet::interface]
pub trait IRoomManager<TContractState> {
    fn create_room(ref self: TContractState, token: felt252) -> felt252;
    fn get_room(self: @TContractState, room_id: felt252) -> Room;
    fn start_battle(ref self: TContractState, room_id: felt252);
    fn end_battle(ref self: TContractState, room_id: felt252);
}

#[starknet::contract]
pub mod RoomManager {

    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, Map, StoragePathEntry};
    use core::poseidon::PoseidonTrait;
    use core::poseidon::poseidon_hash_span;
    use core::hash::{HashStateTrait, HashStateExTrait};

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        RoomCreated: RoomCreated,
        BattleStarted: BattleStarted,
        BattleEnded: BattleEnded
    }

    #[derive(Drop, starknet::Event)]
    pub struct RoomCreated {
        room_id: felt252,
        created_by: ContractAddress
    }

    #[derive(Drop, starknet::Event)]
    pub struct BattleStarted {
        room_id: felt252,
        started_by: ContractAddress
    }

    #[derive(Drop, starknet::Event)]
    pub struct BattleEnded {
        room_id: felt252,
        ended_by: ContractAddress
    }

    #[storage]
    struct Storage {
        rooms: Map<felt252, super::Room>
    }

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl RoomManagerImpl of super::IRoomManager<ContractState> {
        fn create_room(ref self: ContractState, token: felt252) -> felt252 {
            let creator = get_caller_address();
            let status = super::RoomStatus::BeforeBattle;
            let mut room_id = PoseidonTrait::new().update(creator.try_into().unwrap()).update(token).finalize();

            let mut room = self.rooms.entry(room_id);
            room.id.write(room_id);
            room.creator.write(creator);
            room.token.write(token);
            room.status.write(status);

            self.emit(RoomCreated {
                room_id,
                created_by: creator
            });

            room_id
        }

        fn get_room(self: @ContractState, room_id: felt252) -> super::Room {
            let room = self.rooms.entry(room_id);
            assert(room.id.read() != '', 'Room does not exist');
            room.read()
        }

        fn start_battle(ref self: ContractState, room_id: felt252) {
            let caller = get_caller_address();

            let mut room = self.rooms.entry(room_id);
            assert(room.id.read() != '', 'Room does not exist');

            room.status.write(super::RoomStatus::BattleStarted);

            self.emit(BattleStarted {
                room_id,
                started_by: caller
            })
        }

        fn end_battle(ref self: ContractState, room_id: felt252) {
            let caller = get_caller_address();

            let mut room = self.rooms.entry(room_id);
            assert(room.id.read() != '', 'Room does not exist');

            room.status.write(super::RoomStatus::BattleEnded);

            self.emit(BattleEnded {
                room_id,
                ended_by: caller
            })
        }
    }
}
