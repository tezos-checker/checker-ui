import { useAppDispatch } from '@config'
import { burrowStorageActions } from './burrow-storage.slice'
import { BurrowStorageRow } from './burrow-storage.type'

export const useBurrowStorageDispatcher = () => {
  const dispatch = useAppDispatch()

  return {
    updateBurrowStorage: (burrowStorage: BurrowStorageRow) => () =>
      dispatch(burrowStorageActions.updateBurrowStorage(burrowStorage)),
    deleteBurrowStorage: (burrowId: number) => () =>
      dispatch(burrowStorageActions.deleteBurrowStorage(burrowId)),
  }
}
