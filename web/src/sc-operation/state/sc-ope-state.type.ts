import { AbstractAction, RequestStatus, ScOperationStep } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { BlockResponse } from '@taquito/rpc'
import { TransactionWalletOperation } from '@taquito/taquito'
import { ScOpeCreateBurrowSubmitParams } from '../sc-create-burrow/sc-ope-create-burrow.api'
import { ScOpeDepositTezSubmitParams } from '../sc-deposit-tez/sc-ope-deposit-tez.api'

export enum ScWalletOperation {
  increment = 'increment',
  decrement = 'decrement',
  activate_burrow = 'activate_burrow',
  add_liquidity = 'add_liquidity',
  burn_kit = 'burn_kit',
  buy_kit = 'buy_kit',
  cancel_liquidation_slice = 'cancel_liquidation_slice',
  create_burrow = 'create_burrow',
  deactivate_burrow = 'deactivate_burrow',
  deposit_tez = 'deposit_tez',
  liquidation_auction_claim_win = 'liquidation_auction_claim_win',
  liquidation_auction_place_bid = 'liquidation_auction_place_bid',
  liquidation_auction_reclaim_bid = 'liquidation_auction_reclaim_bid',
  mark_for_liquidation = 'mark_for_liquidation',
  mint_kit = 'mint_kit',
  receive_price = 'receive_price',
  receive_slice_from_burrow = 'receive_slice_from_burrow',
  remove_liquidity = 'remove_liquidity',
  sell_kit = 'sell_kit',
  set_burrow_delegate = 'set_burrow_delegate',
  touch = 'touch',
  touch_burrow = 'touch_burrow',
  touch_liquidation_slices = 'touch_liquidation_slices',
  update_operators = 'update_operators',
  withdraw_tez = 'withdraw_tez',
  balance_of = 'balance_of',
  transfer = 'transfer',
  deployFunction = 'deployFunction',
  sealContract = 'sealContract',
}

export type ScOperationRowState = {
  operationId: string
  burrowId: string
  status: RequestStatus
  nbConfirmation: number
  errorMsg: string
  operationStep: ScOperationStep
  operationName: ScWalletOperation
  submitOperationParams: ScOpeCreateBurrowSubmitParams | ScOpeDepositTezSubmitParams
  transactionWalletOperation: TransactionWalletOperation | null
  blockResponse: BlockResponse | null
}

export type ScOperationAction = AbstractAction<ScOperationRowState>

export type EntityOperationState = EntityState<ScOperationRowState>
