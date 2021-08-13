import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeDepositCollateral = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeDeposit = (amount: number) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.deposit_collateral,
      amount,
    )

    dispatch(burrowOpeActions.DepositCollateralSubmit(payload))
    callBack()
  }

  return {
    DepositCollateral: (amount: number) => executeDeposit(amount),
  }
}
