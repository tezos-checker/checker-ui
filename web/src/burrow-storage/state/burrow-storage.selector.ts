import { RequestStatus } from '@config'
import { useSelector } from 'react-redux'
import { getStorageForBurrow } from './burrow-storage.slice'

const createInitalBurrowStorage = (burrowId: number) => ({
  burrowId,
  status: RequestStatus.idle,
  errorMsg: '',
  storage: null,
})

export const getBurrowStorage = (burrowId: number) =>
  useSelector((state) => getStorageForBurrow(state, burrowId)) ||
  createInitalBurrowStorage(burrowId)
