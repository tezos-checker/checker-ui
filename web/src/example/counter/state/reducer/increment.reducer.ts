import { CounterState } from '../counter.state'

export const IncrementReducer = (state: CounterState): CounterState => {
  const value = state.value + 1
  return { value }
}
