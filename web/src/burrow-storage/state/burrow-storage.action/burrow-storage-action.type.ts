import { AbstractAction } from '@config'
import { BurrowRowStorage } from '../burrow-storage-state.type'

// Load burrow storage
export type BurrowLoadStorageActionPayload = {
  burrowId: number
  scAddress: string
}
export type BurrowLoadStorageAction = AbstractAction<BurrowLoadStorageActionPayload>

// Load burrow storage
export type BurrowLoadStorageResultActionPayload = BurrowRowStorage & BurrowLoadStorageActionPayload
export type BurrowLoadStorageResultAction = AbstractAction<BurrowLoadStorageResultActionPayload>
