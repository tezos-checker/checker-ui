import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@config'
import { IncrementReducer } from './reducer/increment.reducer'
import { DecrementReducer } from './reducer/decrement.reducer'
import { IncrementByAmountReducer } from './reducer/increment-by-amount.reducer'
import { CounterState } from './counter.state'

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => IncrementReducer(state),
    decrement: (state) => DecrementReducer(state),
    incrementByAmount: (state, action: PayloadAction<number>) =>
      IncrementByAmountReducer(state, action),
  },
})
