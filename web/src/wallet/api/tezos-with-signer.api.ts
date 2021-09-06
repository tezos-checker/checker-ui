import { ContractAbstraction, ContractProvider } from '@taquito/taquito'
import { tezos } from '@wallet'
import BigNumber from 'bignumber.js'
// import { tezosWithSigner } from '../config/wallet.config'

const getSwapContract = async (
  swapContractAddress: string,
): Promise<ContractAbstraction<ContractProvider>> => {
  debugger
  const swapContract = await tezos.contract.at(swapContractAddress)
  debugger
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
