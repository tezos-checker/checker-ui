import { combineEpics } from 'redux-observable'
import { loadBurrowStorageEpic } from './burrow-storage.epic/burrow-load-storage.epic'
import { triggerLoadBurrowStorageEpic } from './burrow-storage.epic/burrow-trigger-load-storage.epic'

export const burrowStorageEpics = combineEpics(loadBurrowStorageEpic, triggerLoadBurrowStorageEpic)
