import { RootState } from './store.type'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cogarius-check-state')
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (state: Partial<RootState>) => {
  try {
    localStorage.setItem('cogarius-check-state', JSON.stringify(state))
  } catch (error) {
    // ignore error
  }
}
