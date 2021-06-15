import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type CfmmOpeAddLiquiditySubmitParams = {
  ctez: number
  kit: number
  minTokens: number
  deadLine: Date
}

export const cfmmOpeAddLiquiditySubmitRequest = async (
  scAddress: string,
  ctez: number,
  kit: number,
  minTokens: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.add_liquidity(ctez, kit, minTokens, deadLine).send()
}