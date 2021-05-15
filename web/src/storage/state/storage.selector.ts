import { useSelector } from 'react-redux'
import { getStorageForBurrow } from './storage.slice'

export const getStorage = (burrowId: number) =>
  useSelector((state) => getStorageForBurrow(state, burrowId))
