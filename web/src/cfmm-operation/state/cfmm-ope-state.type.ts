import { AbstractAction, OperationStep, RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { BlockResponse } from '@taquito/rpc'
import { CfmmOpeBuyKitSubmitParams } from '../cfmm-ope-buy-kit/cfmm-ope-buy-kit.api'

export enum CfmmOpeName {
  buy_kit = 'buy_kit',
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

export type CfmmOpeSubmitParams = CfmmOpeBuyKitSubmitParams

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
