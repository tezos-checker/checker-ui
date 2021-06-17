import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeWithdrawTez = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeWithdraw = (tez: number) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.withdraw_tez,
      tez,
    )

    dispatch(burrowOpeActions.withdrawTezSubmit(payload))
    callBack()
  }

  return {
    withdrawTez: (tez: number) => executeWithdraw(tez),
  }
}
