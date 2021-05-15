import { RequestStatus, useAppDispatch } from '@config'
import { BurrowStorageRow } from './storage-state.type'
import { storageActions } from './storage.slice'

export const useStorageDispatcher = () => {
  const dispatch = useAppDispatch()

  return {
    loadStorage: (storage: BurrowStorageRow) => () =>
      dispatch(
        storageActions.loadStorage({
          ...storage,
          status: RequestStatus.pending,
        }),
      ),
    deleteBurrowStorage: (burrowId: number) => () =>
      dispatch(storageActions.deleteBurrowStorage(burrowId)),
  }
}
