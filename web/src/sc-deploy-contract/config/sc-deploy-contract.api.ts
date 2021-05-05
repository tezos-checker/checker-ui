import { tezos } from '@config'
import { ContractAbstraction, OriginationWalletOperation, Wallet } from '@taquito/taquito'

// eslint-disable-next-line
const contractMichelson = require('./sc-contract-michelson.json')

// eslint-disable-next-line
const contractStorage = require('./sc-contract-storage.json')

export const scDeployContractSubmit = (): Promise<OriginationWalletOperation> =>
  tezos.wallet
    .originate({
      code: contractMichelson,
      init: contractStorage,
    })
    .send()

export const scDeployContractConfirm = async (ope: {
  contract: () => Promise<ContractAbstraction<Wallet>>
}): Promise<ContractAbstraction<Wallet>> => {
  const contract = await ope.contract()
  return contract
}
