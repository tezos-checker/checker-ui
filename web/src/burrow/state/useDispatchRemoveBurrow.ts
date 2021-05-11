import { useAppDispatch } from '@config'
import { burrowActions } from './burrow.slice'

export const useDispatchRemoveBurrow = (burrowId: string) => {
  const dispatch = useAppDispatch()

  return () => dispatch(burrowActions.removeBurrow(burrowId))
}
