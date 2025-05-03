use contracts::base::types::{Category, Pool, PoolDetails, Status};
use contracts::interfaces::iUtils::{IUtilityDispatcher, IUtilityDispatcherTrait};
use contracts::interfaces::ipredifi::{IPredifiDispatcher, IPredifiDispatcherTrait};
use contracts::utils::Utils;
use contracts::utils::Utils::InternalFunctionsTrait;
use core::array::ArrayTrait;
use core::felt252;
use core::serde::Serde;
use core::traits::{Into, TryInto};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, declare, start_cheat_block_timestamp,
    start_cheat_caller_address, stop_cheat_block_timestamp, stop_cheat_caller_address, test_address,
};
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::{
    ClassHash, ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    get_contract_address,
};

// Validator role
const VALIDATOR_ROLE: felt252 = selector!("VALIDATOR_ROLE");
// Pool creator address constant
const POOL_CREATOR: ContractAddress = 123.try_into().unwrap();

fn deploy_predifi() -> (IPredifiDispatcher, ContractAddress, ContractAddress) {
    let owner: ContractAddress = contract_address_const::<'owner'>();
    let admin: ContractAddress = contract_address_const::<'admin'>();
    let validator: ContractAddress = contract_address_const::<'validator'>();

    // Deploy mock ERC20
    let erc20_class = declare("STARKTOKEN").unwrap().contract_class();
    let mut calldata = array![POOL_CREATOR.into(), owner.into(), 6];
    let (erc20_address, _) = erc20_class.deploy(@calldata).unwrap();

    let contract_class = declare("Predifi").unwrap().contract_class();

    let (contract_address, _) = contract_class
        .deploy(@array![erc20_address.into(), admin.into(), validator.into()])
        .unwrap();
    let dispatcher = IPredifiDispatcher { contract_address };
    (dispatcher, POOL_CREATOR, erc20_address)
}

// Helper function for creating pools with default parameters
fn create_default_pool(contract: IPredifiDispatcher) -> u256 {
    contract
        .create_pool(
            'Example Pool',
            Pool::WinBet,
            "A simple betting pool",
            "image.png",
            "event.com/details",
            1710000000,
            1710003600,
            1710007200,
            'Team A',
            'Team B',
            100,
            10000,
            5,
            false,
            Category::Sports,
        )
}

fn setup_validator(contract: IPredifiDispatcher, validator: ContractAddress) -> IPredifiDispatcher {
    contract.grant_validator_role(validator);
    contract
}

fn create_locked_pool(contract: IPredifiDispatcher, admin: ContractAddress) -> u256 {
    start_cheat_caller_address(contract.contract_address, admin);
    let pool_id = create_default_pool(contract);

    // Advance time to lock pool
    let current_time = get_block_timestamp();
    start_cheat_block_timestamp(contract.contract_address, current_time + 10000);
    contract.update_pool_state(pool_id);
    stop_cheat_block_timestamp(contract.contract_address);

    stop_cheat_caller_address(contract.contract_address);
    pool_id
}


const ONE_STRK: u256 = 1_000_000_000_000_000_000;

#[test]
fn test_create_pool() {
    let (contract, pool_creator, erc20_address) = deploy_predifi();

    let erc20: IERC20Dispatcher = IERC20Dispatcher { contract_address: erc20_address };
    // Approve the DISPATCHER contract to spend tokens
    start_cheat_caller_address(erc20_address, pool_creator);
    erc20.approve(contract.contract_address, 200_000_000_000_000_000_000_000);
    stop_cheat_caller_address(erc20_address);
    start_cheat_caller_address(contract.contract_address, pool_creator);
    let pool_id = create_default_pool(contract);
    assert!(pool_id != 0, "not created");
}
