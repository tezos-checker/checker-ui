import { CounterState } from '../counter.state'

export const DecrementReducer = (state: CounterState): CounterState => {
  const value = state.value - 1
  return { value }
}
