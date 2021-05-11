import { EntityState } from '@reduxjs/toolkit'
import { ScOperationRowState } from '../../sc-operation/state/sc-ope-state.type'

export type BurrowRowState = Pick<
  ScOperationRowState,
  'burrowId' | 'status' | 'operationName' | 'blockResponse' | 'errorMsg'
>

export type EntityBurrowState = EntityState<BurrowRowState>
