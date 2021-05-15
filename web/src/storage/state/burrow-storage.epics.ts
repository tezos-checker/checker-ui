import { combineEpics } from 'redux-observable'
import { createBurrowStorageEpic } from './create-burrow-storage/create-burrow-storage.epic'
import { loadBurrowStorageEpic } from './load-burrow-storage/load-burrow-storage.epic'
import { triggerLoadBurrowStorageEpic } from './trigger-load-burrow-storage/trigger-load-burrow-storage.epic'

export const burrowStorageEpics = combineEpics(
  createBurrowStorageEpic,
  loadBurrowStorageEpic,
  triggerLoadBurrowStorageEpic,
)
