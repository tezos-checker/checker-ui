import { AbstractAction } from '@config'
import { StorageRow } from '../storage-state.type'

export type LoadStorageAction = AbstractAction<StorageRow>
export type LoadStorageResultAction = AbstractAction<StorageRow>
