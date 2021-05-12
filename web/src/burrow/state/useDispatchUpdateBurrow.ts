import { useAppDispatch } from '@config'
import { BurrowRowState } from './burrow-state.type'
import { burrowActions } from './burrow.slice'

export const useDispatchUpdateBurrow = () => {
  const dispatch = useAppDispatch()

  return {
    updateBurrow: (burrow: BurrowRowState) => () => dispatch(burrowActions.updateBurrow(burrow)),
  }
}
