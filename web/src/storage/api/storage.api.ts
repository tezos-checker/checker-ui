import { getContract } from '@config'
import { BurrowStorage, CheckerStorage } from '../state/storage-state.type'

export type LoadStorageResp = {
  burrowStorage: BurrowStorage
  checkerStorage: CheckerStorage
}

export const loadStorageRequest = async (
  burrowId: number,
  walletAddress: string,
  scAddress: string,
): Promise<LoadStorageResp> => {
  const contract = await getContract(scAddress)
  const storage: any = await contract.storage()

  const burrowStorage = await storage[1].sealed.burrows.get({
    0: walletAddress,
    1: burrowId,
  })

  const checkerStorage = storage[1].sealed.parameters

  return {
    burrowStorage,
    checkerStorage,
  }
}
