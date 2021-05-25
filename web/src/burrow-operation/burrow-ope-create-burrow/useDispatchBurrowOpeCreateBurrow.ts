import { useAppDispatch } from '@config'
import { BurrowOpeName, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createBurrowOpeSubmitPayload } from '../state/burrow-ope-state.utils'
import { burrowOpeActions } from '../state/burrow-ope.slice'
import { BurrowOpeCreateBurrowSubmitParams } from './burrow-ope-create-burrow.api'

export const useDispatchBurrowOpeCreateBurrow = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const exeCreateBurrow = (
    burrowId: number,
    scAddress: string,
    operationSubmitParams: BurrowOpeCreateBurrowSubmitParams,
  ) => {
    const payload: BurrowOpeRowState = createBurrowOpeSubmitPayload(
      burrowId,
      scAddress,
      BurrowOpeName.create_burrow,
      operationSubmitParams,
    )

    dispatch(burrowOpeActions.createBurrowSubmit(payload))
    callBack()
  }
  return {
    createBurrow: (
      burrowId: number,
      scAddress: string,
      burrowParams: BurrowOpeCreateBurrowSubmitParams,
    ) => exeCreateBurrow(burrowId, scAddress, burrowParams),
  }
}
