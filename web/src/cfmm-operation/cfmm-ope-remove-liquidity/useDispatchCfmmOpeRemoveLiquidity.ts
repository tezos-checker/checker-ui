import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@wallet'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeRemoveLiquidity = (checkerAdress: string) => {
  const dispatch = useAppDispatch()

  const executeRemoveLiquidity = (
    kit: number,
    minTez: number,
    minKit: number,
    deadLine: number,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.remove_liquidity,
      {
        kit: TzFormatTzToMutez(kit).toNumber(),
        minTez: TzFormatTzToMutez(minTez).toNumber(),
        minKit: TzFormatTzToMutez(minKit).toNumber(),
        deadLine: new Date(new Date().getTime() + deadLine * 60000 * 20),
      },
    )

    dispatch(cfmmOpeActions.removeLiquiditySubmit(payload))
  }

  return {
    removeLiquidity: (kit: number, minTez: number, minKit: number, deadLine: number) =>
      executeRemoveLiquidity(kit, minTez, minKit, deadLine),
  }
}
