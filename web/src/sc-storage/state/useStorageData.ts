import { store } from '@config'
import { useSelector } from 'react-redux'
import { scStorageSelectors } from './sc-storage.slice'

export const scStorageSelector = () => scStorageSelectors.selectById(store.getState(), '1') || null

export const useStorageData = () => useSelector(scStorageSelector)
