import { useSelector } from 'react-redux'
import { getStorageForBurrow } from './storage.slice'

export const useGetBurrowStorage = (burrowId: number) =>
  useSelector((state) => getStorageForBurrow(state, burrowId))
