import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@shared/utils'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeRemoveLiquidity = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const executeRemoveLiquidity = (
    checkerAdress: string,
    kit: number,
    minTez: number,
    minKit: number,
    deadLine: Date,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.remove_liquidity,
      {
        kit: TzFormatTzToMutez(kit).toNumber(),
        minTez,
        minKit,
        deadLine,
      },
    )

    dispatch(cfmmOpeActions.removeLiquiditySubmit(payload))
    callBack()
  }

  return {
    removeLiquidity: (
      checkerAdress: string,
      kit: number,
      minTez: number,
      minKit: number,
      deadLine: Date,
    ) => executeRemoveLiquidity(checkerAdress, kit, minTez, minKit, deadLine),
  }
}
