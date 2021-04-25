import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'

export type WalletPayload = {
  id: string
  address: string | undefined
  errMsg: string
  status: RequestStatus
}

export type EntityWalletState = EntityState<WalletPayload>
