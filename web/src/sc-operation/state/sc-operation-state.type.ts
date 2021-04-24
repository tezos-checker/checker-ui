import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'
import { TransactionWalletOperation } from '@taquito/taquito'

export enum ScTypeOperation {
  increment = 'increment',
  decrement = 'decrement',
}

export enum ScOperationStatus {
  transfert = 'transfert',
  confirme = 'confirme',
  confirmed = 'confirmed',
}

export type ScOperation = {
  id: string
  operationType: ScTypeOperation
  operationStatus: ScOperationStatus
  status: RequestStatus
  errorMsg: string
  amount: number
  operationParams: any
}

export type IncrementTransfertOpParams = {
  value: number
  nbConfirmation: number
}

export type IncrementConfirmationOpParams = {
  operation: TransactionWalletOperation
  nbConfirmation: number
}

export type EntityOperationState = EntityState<ScOperation>
