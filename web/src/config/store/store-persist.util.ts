import { errorToast } from '@shared/ui'
import { RootState } from './store.type'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cogarius-check-state')
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (error) {
    errorToast('load local storage failed', error.message)
    return undefined
  }
}

export const saveState = (state: Partial<RootState>) => {
  try {
    const stateToSave = JSON.stringify(state)
    localStorage.setItem('cogarius-check-state', stateToSave)
  } catch (error) {
    errorToast('save local storage failed', error.message)
    console.error(error)
    // ignore error
  }
}
