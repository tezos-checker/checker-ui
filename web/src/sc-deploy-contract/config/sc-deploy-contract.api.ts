import { tezos } from '@config'
import { ContractAbstraction, OriginationWalletOperation, Wallet } from '@taquito/taquito'

// eslint-disable-next-line
const genericMultisigJSONfile = require('./sc-increment-michelson.json')

export const scDeployContractSubmit = (): Promise<OriginationWalletOperation> => {
  debugger // eslint-disable-line no-debugger
  console.log(genericMultisigJSONfile)

  return tezos.wallet
    .originate({
      code: genericMultisigJSONfile,
      storage: {},
    })
    .send()
}

export const scDeployContractConfirm = async (ope: {
  contract: () => Promise<ContractAbstraction<Wallet>>
}): Promise<ContractAbstraction<Wallet>> => {
  const contract = await ope.contract()
  return contract
}
