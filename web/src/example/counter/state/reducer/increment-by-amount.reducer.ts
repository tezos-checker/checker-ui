import { PayloadAction } from '@reduxjs/toolkit'
import { CounterState } from '../counter.state'

export const IncrementByAmountReducer = (
  state: CounterState,
  action: PayloadAction<number>,
): CounterState => {
  const value = state.value + action.payload
  return { value }
}
