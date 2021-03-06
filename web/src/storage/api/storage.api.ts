import { getWalletContract } from '@wallet'
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
  const contract = await getWalletContract(scAddress)
  const storage: any = await contract.storage()

  const burrowStorage = await storage.deployment_state.sealed.burrows.get({
    0: walletAddress,
    1: burrowId,
  })

  const checkerStorage = storage.deployment_state.sealed.parameters

  return {
    burrowStorage,
    checkerStorage,
  }
}
