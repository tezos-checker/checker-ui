import { RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { TransactionWalletOperation } from '@taquito/taquito'

export type BurrowRowState = {
  id: string
  transactionWalletOperation: TransactionWalletOperation
  errMsg: string
  status: RequestStatus
}

export type EntityBurrowState = EntityState<BurrowRowState>
