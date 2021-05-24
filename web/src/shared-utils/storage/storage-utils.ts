import { StorageRow } from 'src/storage/state/storage-state.type'

export const isInvalidStorageBurrow = (storage?: StorageRow) => !storage || !storage.burrowStorage

export const isInvalidStorageParameters = (storage?: StorageRow) =>
  !storage || !storage.checkerStorage

export const isInvalidStorage = (storage?: StorageRow) =>
  isInvalidStorageBurrow(storage) || isInvalidStorageParameters(storage)
