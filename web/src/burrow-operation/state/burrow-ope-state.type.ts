import { AbstractAction, OperationStep, RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { BlockResponse } from '@taquito/rpc'
import { BurrowOpeCreateBurrowSubmitParams } from '../burrow-ope-create-burrow/burrow-ope-create-burrow.api'

export enum BurrowOpeName {
  create_burrow = 'create_burrow',
  activate_burrow = 'activate_burrow',
  deactivate_burrow = 'deactivate_burrow',
  set_burrow_delegate = 'set_burrow_delegate',
  deposit_collateral = 'deposit_collateral',
  withdraw_collateral = 'withdraw_collateral',
  mint_kit = 'mint_kit',
  burn_kit = 'burn_kit',
  mark_for_liquidation = 'mark_for_liquidation',
  liquidation_auction_place_bid = 'liquidation_auction_place_bid',
  liquidation_auction_claim_win = 'liquidation_auction_claim_win',
  cancel_liquidation_slice = 'cancel_liquidation_slice',
  receive_slice_from_burrow = 'receive_slice_from_burrow',
  touch = 'touch',
  touch_burrow = 'touch_burrow',
  touch_liquidation_slices = 'touch_liquidation_slices',
  receive_price = 'receive_price',
  update_operators = 'update_operators',
  balance_of = 'balance_of',
  transfer = 'transfer',
  deployFunction = 'deployFunction',
  sealContract = 'sealContract',
}
export type TransactionOperationParams = {
  confirmOperation: (
    nbConfirmation: number,
  ) => Promise<{
    block: BlockResponse
    expectedConfirmation: number
    currentConfirmation: number
    completed: boolean
    isInCurrentBranch: () => Promise<boolean>
  }>
}

export type BurrowOpeSubmitParams = BurrowOpeCreateBurrowSubmitParams | number

export type BurrowOpeRowState = {
  burrowId: number
  scAddress: string
  status: RequestStatus
  nbConfirmation: number
  errorMsg: string
  operationStep: OperationStep
  operationName: BurrowOpeName
  operationSubmitParams: BurrowOpeSubmitParams
  transactionWalletOperation: TransactionOperationParams | null
  blockResponse: BlockResponse | null
}

export type BurrowOpeAction = AbstractAction<BurrowOpeRowState>

export type BurrowOpeEntityState = EntityState<BurrowOpeRowState>
