import { StorageRow } from 'src/storage/state/storage-state.type'

export const isInvalidStorageBurrow = (storage?: StorageRow) =>
  !storage || !storage.storage || !storage.storage.burrow

export const isInvalidStorageParameters = (storage?: StorageRow) =>
  !storage || !storage.storage || !storage.storage.parameters

export const isInvalidStorage = (storage?: StorageRow) =>
  isInvalidStorageBurrow(storage) || isInvalidStorageParameters(storage)
