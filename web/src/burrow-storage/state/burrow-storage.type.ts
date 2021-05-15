import { RequestStatus } from '@config'

export type BurrowStorage = {
  active: boolean
  address: string
  adjustement_index: number
  collateral: number
  collateral_at_auction: number
  delegate: any
  excess_kit: number
  last_touched: any
  outstanding_kit: number
}

export type CheckerStorageParameters = {
  burrow_fee_index: number
  circulating_kit: number
  drift: number
  drift_derivative: number
  imbalance_index: number
  index: number
  last_touched: string
  outstanding_kit: number
  protected_index: number
  q: number
  target: number
}

export type CheckerStorage = any & {
  burrow: BurrowStorage
  parameters: CheckerStorageParameters
}

export type BurrowStorageRow = {
  burrowId: number
  status: RequestStatus
  errorMsg: string
  storage: CheckerStorage | null
}
