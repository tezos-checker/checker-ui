import { SC_ADDRESS, tezos } from '@config'

export const getStorage = async (): Promise<any> => {
  const contract = await tezos.contract.at(SC_ADDRESS)
  return contract.storage()
}
