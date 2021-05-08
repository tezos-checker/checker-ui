import { RequestStatus } from '@config'
import { EntityState } from '@reduxjs/toolkit'

export type ScStorageRowState = {
  id: number
  status: RequestStatus
  content: any
  errMsg: string
}

export type EntityStorageState = EntityState<ScStorageRowState>
