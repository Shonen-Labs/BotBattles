// use contracts::base::types::{Category, Pool, PoolDetails, Status};
// use contracts::interfaces::iUtils::{IUtilityDispatcher, IUtilityDispatcherTrait};
use contracts::Betting::{IBetting, IBettingDispatcher, IBettingDispatcherTrait};
// use contracts::predifi::Predifi;
// use contracts::utils::Utils;
// use contracts::utils::Utils::InternalFunctionsTrait;
// use core::array::ArrayTrait;
// use core::felt252;
// use core::serde::Serde;
// use core::traits::{Into, TryInto};
// use openzeppelin::access::accesscontrol::AccessControlComponent::InternalTrait as
// AccessControlInternalTrait;
// use openzeppelin::access::accesscontrol::DEFAULT_ADMIN_ROLE;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_block_timestamp, start_cheat_caller_address, stop_cheat_block_timestamp,
    stop_cheat_caller_address, test_address,
};
use starknet::storage::{MutableVecTrait, StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::{
    ClassHash, ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    get_contract_address,
};

// // Validator role
const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");

const OWNER: ContractAddress = 'owner'.try_into().unwrap();

fn deploy_betting_contract() -> (IBettingDispatcher, ContractAddress) {
    // Deploy mock ERC20
    let erc20_class = declare("STRK").unwrap().contract_class();
    let mut calldata = array![OWNER.into(), OWNER.into(), 6];
    let (erc20_address, _) = erc20_class.deploy(@calldata).unwrap();

    let contract_class = declare("Betting").unwrap().contract_class();

    let (contract_address, _) = contract_class
        .deploy(@array![OWNER.into(), erc20_address.into()])
        .unwrap();
    let dispatcher = IBettingDispatcher { contract_address };
    (dispatcher, erc20_address)
}

#[test]
fn test_create_room() {
    let (dispatcher, _) = deploy_betting_contract();

    dispatcher.create_game();
}

