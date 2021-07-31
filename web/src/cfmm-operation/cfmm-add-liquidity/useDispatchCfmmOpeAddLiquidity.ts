import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@wallet'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeAddLiquidity = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const executeAddLiquidity = (
    checkerAdress: string,
    ctez: number,
    kit: number,
    minTokens: number,
    deadLine: Date,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.add_liquidity,
      {
        ctez: TzFormatTzToMutez(ctez).toNumber(),
        kit: TzFormatTzToMutez(kit).toNumber(),
        minTokens,
        deadLine,
      },
    )

    dispatch(cfmmOpeActions.addLiquiditySubmit(payload))
    callBack()
  }

  return {
    addLiquidity: (
      checkerAdress: string,
      ctez: number,
      kit: number,
      minTokens: number,
      deadLine: Date,
    ) => executeAddLiquidity(checkerAdress, ctez, kit, minTokens, deadLine),
  }
}
