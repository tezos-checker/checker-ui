import { RequestStatus } from '@api'
import { ScOperationStep } from '@config'
import { EntityState } from '@reduxjs/toolkit'
import { ContractAbstraction, Wallet } from '@taquito/taquito'

export type ScDeployContractOperationPayload = {
  contract: () => Promise<ContractAbstraction<Wallet>>
}

export type ScDeployContractWalletPayload = {
  address: string
}

export type ScDeployContractRowState = {
  id: number
  status: RequestStatus
  opeStep: ScOperationStep
  originationWalletOperation?: ScDeployContractOperationPayload
  wallet?: ScDeployContractWalletPayload
  errMsg: string
}

export type EntityDeployContractState = EntityState<ScDeployContractRowState>
