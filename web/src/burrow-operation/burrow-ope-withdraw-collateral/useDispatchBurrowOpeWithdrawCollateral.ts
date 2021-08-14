import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeWithdrawCollateral = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeWithdraw = (amount: number) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.withdraw_collateral,
      amount,
    )

    dispatch(burrowOpeActions.WithdrawCollateralSubmit(payload))
    callBack()
  }

  return {
    WithdrawCollateral: (amount: number) => executeWithdraw(amount),
  }
}
