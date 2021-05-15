import { BurrowRowState } from '@burrow'
import { useBurrowOpeDispatcher } from '@burrow-operation'
import { useStorageDispatcher } from '@burrow-storage'
import { useAppDispatch } from '@config'
import { burrowActions } from './burrow.slice'

export const useBurrowDispatcher = () => {
  const dispatch = useAppDispatch()
  const { deleteBurrowOperation } = useBurrowOpeDispatcher()
  const { deleteBurrowStorage } = useStorageDispatcher()

  return {
    updateBurrow: (burrow: BurrowRowState) => () => dispatch(burrowActions.updateBurrow(burrow)),
    deleteBurrow: (burrowId: number) => () => {
      dispatch(burrowActions.deleteBurrow(burrowId))
      deleteBurrowOperation(burrowId)()
      deleteBurrowStorage(burrowId)()
    },
  }
}
