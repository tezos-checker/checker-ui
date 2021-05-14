import { useSelector } from 'react-redux'
import { getOpeForBurrow } from './burrow-ope.slice'

export const getBurrowOperation = (burrowId: number) =>
  useSelector((state) => getOpeForBurrow(state, burrowId))
