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

export type BurrowStorageRow = {
  burrowId: number
  status: RequestStatus
  errorMsg: string
  storage: BurrowStorage | null
}
