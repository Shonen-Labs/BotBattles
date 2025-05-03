#[starknet::interface]
pub trait BettingInterface<TContractState> {
    fn place_bet(
        ref self: TContractState, room_id: u256, agent_id: u256, amount: u256,
    ); // record bets, lock tokens
    fn withdraw_winnings(
        ref self: TContractState, room_id: u256, agent_id: u256,
    ); // transfer to winner
}
