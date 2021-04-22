import { RequestStatus } from '@api'

export type WalletState = {
  address: string
  errMsg: string
  connectionStatus: RequestStatus
}
