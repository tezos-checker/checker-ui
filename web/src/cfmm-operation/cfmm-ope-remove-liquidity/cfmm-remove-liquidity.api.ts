import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export type CfmmOpeRemoveLiquiditySubmitParams = {
  kit: number
  minTez: number
  minKit: number
  deadLine: Date
}

export const cfmmOpeRemoveLiquiditySubmitRequest = async (
  scAddress: string,
  kit: number,
  minTez: number,
  minKit: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.remove_liquidity(kit, minTez, minKit, deadLine).send()
}
