import { tezosWithSigner } from '@config'
import { ContractAbstraction, ContractProvider } from '@taquito/taquito'
import BigNumber from 'bignumber.js'

const getSwapContract = async (
  swapContractAddress: string,
): Promise<ContractAbstraction<ContractProvider>> => {
  const swapContract = await tezosWithSigner.contract.at(swapContractAddress)
  return swapContract
}

export const getSwapAllowance = async (
  swapContractAddress: string,
  checkerAddress: string,
  walletPKH: string,
): Promise<BigNumber> => {
  const swapContract = await getSwapContract(swapContractAddress)
  const allowance = await swapContract.views.getAllowance(walletPKH, checkerAddress).read()
  return allowance
}

export const getSwapBalance = async (
  swapContractAddress: string,
  walletPKH: string,
): Promise<BigNumber> => {
  const swapContract = await getSwapContract(swapContractAddress)

  const balance = await swapContract.views.getBalance(walletPKH).read()
  return balance
}
