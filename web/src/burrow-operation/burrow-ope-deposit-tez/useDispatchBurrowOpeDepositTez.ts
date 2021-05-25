import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeDepositTez = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeDeposit = (tez: number) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.deposit_tez,
      tez,
    )

    dispatch(burrowOpeActions.depositTezSubmit(payload))
    callBack()
  }

  return {
    depositTez: (tez: number) => executeDeposit(tez),
  }
}
