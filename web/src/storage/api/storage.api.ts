import { getContract } from '@config'
import { CheckerStorage } from '../state/storage-state.type'

export const loadStorageRequest = async (
  burrowId: number,
  walletAddress: string,
  scAddress: string,
): Promise<CheckerStorage> => {
  const contract = await getContract(scAddress)
  debugger
  const storage: any = await contract.storage()

  const checkerStorage: CheckerStorage = {
    burrow: await storage[1].sealed.burrows.get({
      0: walletAddress,
      1: burrowId,
    }),
    parameters: storage[1].sealed.parameters,
  }
  return checkerStorage
}
