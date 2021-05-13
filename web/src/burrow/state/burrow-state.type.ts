import { RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { ScOperationRowState } from '../../sc-operation/state/sc-ope-state.type'

export type BurrowOperation = Pick<ScOperationRowState, 'status' | 'operationName' | 'errorMsg'>

export type BurrowStorage = {
  status: RequestStatus
  storage: any
  errorMsg: string
}

type BorrowRowState = {
  burrowId: number
  scAddress: string
  currentOperation: BurrowOperation
  storage: BurrowStorage
}

export type EntityBurrowState = EntityState<BorrowRowState>
