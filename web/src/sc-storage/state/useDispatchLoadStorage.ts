import { RequestStatus } from '@api'
import { useAppDispatch } from '@config'
import { scStorageActions } from './sc-storage.slice'

export const useDispatchLoadStorage = () => {
  const dispatch = useAppDispatch()

  return () =>
    dispatch(
      scStorageActions.loadStorage({
        id: 1,
        status: RequestStatus.pending,
        errMsg: '',
        content: null,
      }),
    )
}
