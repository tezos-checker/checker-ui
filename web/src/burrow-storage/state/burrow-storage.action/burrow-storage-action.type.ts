import { AbstractAction } from '@config'
import { BurrowStorageRow } from '../burrow-storage.type'

// Load burrow storage
export type BurrowLoadStoragePayload = {
  burrowId: number
  scAddress: string
}
export type BurrowLoadStorageAction = AbstractAction<BurrowLoadStoragePayload>

// Load burrow storage
export type BurrowLoadStorageResultPayload = BurrowStorageRow & BurrowLoadStoragePayload
export type BurrowLoadStorageResultAction = AbstractAction<BurrowLoadStorageResultPayload>
