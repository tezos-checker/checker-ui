import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'

export enum ScOpeEntryPoint {
  increment = 'increment',
  decrement = 'decrement',
}

export enum ScOpeStep {
  transfert = 'transfert',
  confirme = 'confirme',
  confirmed = 'confirmed',
}

export type ScOpePayload = {
  id: string
  status: RequestStatus
  errorMsg: string
  amount: number
  opeEntryPoint: ScOpeEntryPoint
  opeStep: ScOpeStep
  opeParams: any
}
export type ScOpeAction = {
  type: string
  payload: ScOpePayload
}

export type EntityOperationState = EntityState<ScOpePayload>
