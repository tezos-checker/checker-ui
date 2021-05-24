import { RequestStatus } from '@config'
import BigNumber from 'bignumber.js'

export type BurrowStorage = {
  active: boolean
  address: string
  adjustement_index: BigNumber
  collateral: BigNumber
  collateral_at_auction: BigNumber
  delegate: any
  excess_kit: BigNumber
  last_touched: any
  outstanding_kit: BigNumber
}

export type CheckerStorage = {
  burrow_fee_index: BigNumber
  circulating_kit: BigNumber
  drift: BigNumber
  drift_derivative: BigNumber
  imbalance_index: BigNumber
  index: BigNumber
  last_touched: string
  outstanding_kit: BigNumber
  protected_index: BigNumber
  q: BigNumber
  target: BigNumber
}

export type StorageRow = {
  burrowId: number
  status: RequestStatus
  errorMsg: string
  burrowStorage: BurrowStorage
  checkerStorage: CheckerStorage
}
