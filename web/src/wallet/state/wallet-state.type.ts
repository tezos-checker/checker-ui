import { RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'

export type WalletRowState = {
  id: number
  address: string | undefined
  errMsg: string
  status: RequestStatus
}

export type EntityWalletState = EntityState<WalletRowState>
