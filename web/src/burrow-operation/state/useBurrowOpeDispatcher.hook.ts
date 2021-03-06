import { RequestStatus, useAppDispatch } from '@config'
import { Update } from '@reduxjs/toolkit'
import { BurrowOpeRowState } from './burrow-ope-state.type'
import { burrowOpeActions } from './burrow-ope.slice'

export const useBurrowOpeDispatcher = () => {
  const dispatch = useAppDispatch()

  return {
    clearBurrowOpeMessage: (burrowOpeRowState: BurrowOpeRowState) =>
      dispatch(
        burrowOpeActions.clearBurrowOpeMessage({
          ...burrowOpeRowState,
          status: RequestStatus.idle,
        }),
      ),

    deleteBurrowOperation: (burrowId: number) =>
      dispatch(burrowOpeActions.deleteBurrowOpe(burrowId)),

    resetPendingBurrowOperation: (burrowOperations: Update<BurrowOpeRowState>[]) =>
      dispatch(burrowOpeActions.resetPendingBurrowOpe(burrowOperations)),
  }
}
