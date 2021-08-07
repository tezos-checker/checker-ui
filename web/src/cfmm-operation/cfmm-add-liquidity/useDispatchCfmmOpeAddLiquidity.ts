import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@wallet'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeAddLiquidity = (checkerAddress: string) => {
  const dispatch = useAppDispatch()

  const executeAddLiquidity = (
    amount: number,
    maxResult: number,
    minToken: number,
    deadLine: number,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAddress,
      CfmmOpeName.add_liquidity,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        maxResult: TzFormatTzToMutez(maxResult).toNumber(),
        minToken: TzFormatTzToMutez(minToken).toNumber(),
        deadLine: new Date(new Date().getTime() + deadLine * 60000 * 240),
      },
    )

    dispatch(cfmmOpeActions.addLiquiditySubmit(payload))
  }

  return {
    addLiquidity: (amount: number, maxResult: number, minToken: number, deadLine: number) =>
      executeAddLiquidity(amount, maxResult, minToken, deadLine),
  }
}
