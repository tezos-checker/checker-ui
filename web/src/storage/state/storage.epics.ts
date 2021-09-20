import { combineEpics } from 'redux-observable'
import { createStorageEpic } from './create-storage/create-storage.epic'
import { loadCheckerStorageEpic } from './load-storage/load-checker-storage.epic'
import { loadStorageEpic } from './load-storage/load-storage.epic'
import { triggerLoadStorageEpic } from './trigger-load-storage/trigger-load-storage.epic'

export const storageEpics = combineEpics(
  createStorageEpic,
  loadStorageEpic,
  triggerLoadStorageEpic,
  loadCheckerStorageEpic,
)
