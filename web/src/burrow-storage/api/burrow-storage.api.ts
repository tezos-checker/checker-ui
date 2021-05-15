import { getContract } from '@config'
import { CheckerStorage } from '../state/burrow-storage.type'

export const loadBurrowStorageRequest = async (
  burrowId: number,
  walletAddress: string,
  scAddress: string,
): Promise<CheckerStorage> => {
  const contract = await getContract(scAddress)
  const checkerStorage: CheckerStorage = await contract.storage()
  checkerStorage.burrow = await (checkerStorage as any)[1].sealed.burrows.get({
    0: walletAddress,
    1: burrowId,
  })
  return checkerStorage
}
