import { RootState } from '@config'
import { Draft, EntityAdapter, EntitySelectors, EntityState } from '@reduxjs/toolkit'

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>
}

export type BurrowRowState = {
  burrowId: number
  scAddress: string
}

export type BurrowEntitySelector = EntitySelectors<BurrowRowState, RootState>

export type BurrowEntityAdapter = EntityAdapter<BurrowRowState>

export type BurrowStateEntity = EntityState<BurrowRowState>

export type BurrowState = WritableDraft<BurrowStateEntity>
