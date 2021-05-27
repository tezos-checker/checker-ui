import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeBuyKit = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeBuyKit = (amount: number, minAmount: number, deadLine: Date) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.buy_kit,
      { amount, minAmount, deadLine },
    )

    dispatch(burrowOpeActions.buyKitSubmit(payload))
    callBack()
  }

  return {
    buyKit: (amount: number, minAmount: number, deadLine: Date) =>
      executeBuyKit(amount, minAmount, deadLine),
  }
}
