import { AbstractAction } from '@config'
import { BurrowStorageRow } from '../storage-state.type'

export type LoadStorageAction = AbstractAction<BurrowStorageRow>
export type LoadStorageResultAction = AbstractAction<BurrowStorageRow>
