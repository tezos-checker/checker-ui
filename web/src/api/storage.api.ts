import { getContract } from '@config'

export const getStorage = async (scAddress: string): Promise<any> => {
  const contract = await getContract(scAddress)
  return contract.storage()
}
