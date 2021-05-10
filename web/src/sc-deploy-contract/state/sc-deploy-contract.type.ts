import { RequestStatus, ScOperationStep } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { OriginationWalletOperation } from '@taquito/taquito'

export type ScDeployContractRowState = {
  id: number
  status: RequestStatus
  opeStep: ScOperationStep
  originationWalletOperation: OriginationWalletOperation | null
  walletAddress: string | null
  errMsg: string
}

export type EntityDeployContractState = EntityState<ScDeployContractRowState>
