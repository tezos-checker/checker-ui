import { RequestStatus, useAppDispatch } from '@config'
import { BurrowOpeRowState } from './burrow-ope-state.type'
import { burrowOpeActions } from './burrow-ope.slice'

export const useBurrowOpeDispatcher = () => {
  const dispatch = useAppDispatch()

  return {
    clearBurrowOpeMessage: (burrowOpeRowState: BurrowOpeRowState) => () =>
      dispatch(
        burrowOpeActions.clearBurrowOpeMessage({
          ...burrowOpeRowState,
          status: RequestStatus.idle,
        }),
      ),
  }
}
