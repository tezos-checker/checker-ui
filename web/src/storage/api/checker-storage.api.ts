import { getWalletContract } from '@wallet'
import BigNumber from 'bignumber.js'
import { BurrowStorage, CheckerStorage } from '../state/storage-state.type'

export type LoadStorageResp = {
  burrowStorage: BurrowStorage
  checkerStorage: CheckerStorage
}

export const loadCheckerStorageRequest = async (scAddress: string): Promise<LoadStorageResp> => {
  const contract = await getWalletContract(scAddress)

  const storage: any = await contract.storage()

  const burrowStorage: BurrowStorage = {
    active: false,
    address: '',
    adjustement_index: new BigNumber(0),
    collateral: new BigNumber(0),
    collateral_at_auction: new BigNumber(0),
    delegate: undefined,
    excess_kit: new BigNumber(0),
    last_touched: undefined,
    outstanding_kit: new BigNumber(0),
  }

  const checkerStorage = storage.deployment_state.sealed.parameters

  return {
    burrowStorage,
    checkerStorage,
  }
}
