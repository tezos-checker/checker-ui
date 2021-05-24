import { RequestStatus } from '@config'
import { BurrowStorage, CheckerStorage } from '../storage-state.type'
import { CreateStorageAction } from './create-storage.type'

export const EmptyBurrowStorage: BurrowStorage = {
  active: false,
  address: '',
  adjustement_index: 0,
  collateral: 0,
  collateral_at_auction: 0,
  delegate: '',
  excess_kit: 0,
  last_touched: '',
  outstanding_kit: 0,
}

export const EmptyCheckerStorage: CheckerStorage = {
  burrow_fee_index: 0,
  circulating_kit: 0,
  drift: 0,
  drift_derivative: 0,
  imbalance_index: 0,
  index: 0,
  last_touched: '',
  outstanding_kit: 0,
  protected_index: 0,
  q: 0,
  target: 0,
}

export const getCreateStorageAction = (burrowId: number): CreateStorageAction => ({
  type: 'storage/createStorage',
  payload: {
    burrowId,
    status: RequestStatus.idle,
    burrowStorage: EmptyBurrowStorage,
    checkerStorage: EmptyCheckerStorage,
    errorMsg: '',
  },
})
