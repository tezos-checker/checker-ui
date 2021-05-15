import { getContract } from '@config'
import { BurrowStorage } from '../state/burrow-storage.type'

export const loadBurrowStorageRequest = async (
  burrowId: number,
  walletAddress: string,
  scAddress: string,
): Promise<BurrowStorage> => {
  const contract = await getContract(scAddress)
  const storage = await contract.storage()
  return (storage as any)[1].sealed.burrows.get({
    0: walletAddress,
    1: burrowId,
  })
}
