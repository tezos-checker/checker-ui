import { RequestStatus } from '@config'
import BigNumber from 'bignumber.js'
import { BurrowStorage, CheckerStorage } from '../storage-state.type'
import { CreateStorageAction } from './create-storage.type'

const bigNumberZero = new BigNumber(0)
export const EmptyBurrowStorage: BurrowStorage = {
  active: false,
  address: '',
  adjustement_index: bigNumberZero,
  collateral: bigNumberZero,
  collateral_at_auction: bigNumberZero,
  delegate: '',
  excess_kit: bigNumberZero,
  last_touched: '',
  outstanding_kit: bigNumberZero,
}

export const EmptyCheckerStorage: CheckerStorage = {
  burrow_fee_index: bigNumberZero,
  circulating_kit: bigNumberZero,
  drift: bigNumberZero,
  drift_derivative: bigNumberZero,
  imbalance_index: bigNumberZero,
  index: bigNumberZero,
  last_touched: '',
  outstanding_kit: bigNumberZero,
  protected_index: bigNumberZero,
  q: bigNumberZero,
  target: bigNumberZero,
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
