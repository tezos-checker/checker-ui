import { AbstractAction, OperationStep, RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { BlockResponse } from '@taquito/rpc'
import { CfmmOpeAddLiquiditySubmitParams } from '../cfmm-add-liquidity/cfmm-ope-add-liquidity.api'
import { CfmmOpeRemoveLiquiditySubmitParams } from '../cfmm-ope-remove-liquidity/cfmm-ope-remove-liquidity.api'
import { CfmmOpeBuyKitSubmitParams } from '../swap-operation-buy/swap-ope-buy-kit.api'
import { CfmmOpeSellKitSubmitParams } from '../swap-operation-sell/swap-ope-sell.api'

export enum CfmmOpeName {
  buy_kit = 'buy_kit',
  sell_kit = 'sell_kit',
  add_liquidity = 'add_liquidity',
  remove_liquidity = 'remove_liquidity',
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

export type CfmmOpeSubmitParams =
  | CfmmOpeBuyKitSubmitParams
  | CfmmOpeSellKitSubmitParams
  | CfmmOpeAddLiquiditySubmitParams
  | CfmmOpeRemoveLiquiditySubmitParams

export type CfmmOpeRowState = {
  id: number
  scAddress: string
  status: RequestStatus
  nbConfirmation: number
  errorMsg: string
  operationStep: OperationStep
  operationName: CfmmOpeName
  operationSubmitParams: CfmmOpeSubmitParams
  transactionWalletOperation: TransactionOperationParams | null
  blockResponse: BlockResponse | null
}

export type CfmmOpeAction = AbstractAction<CfmmOpeRowState>

export type CfmmOpeEntityState = EntityState<CfmmOpeRowState>
