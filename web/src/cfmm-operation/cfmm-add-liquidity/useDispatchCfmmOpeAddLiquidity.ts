import { useAppDispatch } from '@config'
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
        ctez,
        kit,
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
