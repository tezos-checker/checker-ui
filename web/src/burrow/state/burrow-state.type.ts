import { RequestStatus, RootState } from '@config'
import { Draft, EntityAdapter, EntitySelectors, EntityState, Slice } from '@reduxjs/toolkit'
import { ScOperationRowState } from '../../sc-operation/state/sc-ope-state.type'

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>
}

export type BurrowOperation = Pick<ScOperationRowState, 'status' | 'operationName' | 'errorMsg'>

export type BurrowStorage = {
  status: RequestStatus
  storage: any
  errorMsg: string
}

export type BurrowRowState = {
  burrowId: number
  scAddress: string
  currentOperation: BurrowOperation
  storage: BurrowStorage
}

export type BurrowEntitySelector = EntitySelectors<BurrowRowState, RootState>

export type BurrowEntityAdapter = EntityAdapter<BurrowRowState>

export type BurrowSlice = Slice<{ ids: never[]; entities: {} }>

export type BurrowStateEntity = EntityState<BurrowRowState>

export type BurrowState = WritableDraft<BurrowStateEntity>
