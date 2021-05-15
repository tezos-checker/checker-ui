import { RequestStatus, useAppDispatch } from '@config'
import { burrowStorageActions } from './burrow-storage.slice'
import { BurrowStorageRow } from './burrow-storage.type'

export const useBurrowStorageDispatcher = () => {
  const dispatch = useAppDispatch()

  return {
    loadStorage: (burrowStorage: BurrowStorageRow) => () =>
      dispatch(
        burrowStorageActions.loadStorage({
          ...burrowStorage,
          status: RequestStatus.pending,
        }),
      ),
    deleteBurrowStorage: (burrowId: number) => () =>
      dispatch(burrowStorageActions.deleteBurrowStorage(burrowId)),
  }
}
