import { store } from '@config'
import { useSelector } from 'react-redux'
import { scStorageSelectors } from './sc-storage.slice'
import { ScStorageRowState } from './sc-storage.type'

export const scStorageSelector = () => scStorageSelectors.selectById(store.getState(), 1)

export const useStorageData = () => useSelector(scStorageSelector) as ScStorageRowState
