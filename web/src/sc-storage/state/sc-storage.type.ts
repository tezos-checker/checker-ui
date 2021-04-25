import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'

export type ScStoragePayload = {
  status: RequestStatus
  id: string
  content: any
  errMsg: string
}

export type EntityStorageState = EntityState<ScStoragePayload>
