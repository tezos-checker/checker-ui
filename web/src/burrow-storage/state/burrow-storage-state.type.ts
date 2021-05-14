import { RequestStatus } from '@config'

export type BurrowRowStorage = {
  burrowId: number
  status: RequestStatus
  storage: any
  errorMsg: string
}
