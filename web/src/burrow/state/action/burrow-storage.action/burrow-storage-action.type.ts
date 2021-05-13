import { AbstractAction } from '@config'
import { BurrowStorage } from '../../burrow-state.type'

// Load burrow storage
export type BurrowLoadStorageActionPayload = {
  burrowId: number
  scAddress: string
}
export type BurrowLoadStorageAction = AbstractAction<BurrowLoadStorageActionPayload>

// Load burrow storage
export type BurrowLoadStorageResultActionPayload = BurrowStorage & BurrowLoadStorageActionPayload
export type BurrowLoadStorageResultAction = AbstractAction<BurrowLoadStorageResultActionPayload>
