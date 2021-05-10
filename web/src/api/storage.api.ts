import { getContract } from '@config'

export const getStorage = async (): Promise<any> => {
  const contract = await getContract()
  return contract.storage()
}
