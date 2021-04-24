import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'

export type ScStorage = {
  status: RequestStatus
  id: string
  content: any
  errMsg: string
}

export type EntityStorageState = EntityState<ScStorage>
