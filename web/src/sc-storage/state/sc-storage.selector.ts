import { store } from '@config'
import { scStorageSelectors } from './sc-storage.slice'

export const scStorageSelector = () => scStorageSelectors.selectById(store.getState(), '1') || null
