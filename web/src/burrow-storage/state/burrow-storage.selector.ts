import { useSelector } from 'react-redux'
import { getStorageForBurrow } from './burrow-storage.slice'

export const getBurrowStorage = (burrowId: number) =>
  useSelector((state) => getStorageForBurrow(state, burrowId))
