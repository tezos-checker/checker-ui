import { ContractAbstraction, Wallet } from '@taquito/taquito'

export const getCheckerStorage = async (contract: ContractAbstraction<Wallet>) => {
  const storage: any = await contract.storage()
  return storage
}

export const getSwapAddress = async (contract: ContractAbstraction<Wallet>): Promise<string> => {
  const storage = await getCheckerStorage(contract)
  return storage.deployment_state.sealed.external_contracts.ctez as string
}
