import { combineEpics } from 'redux-observable'
import { createBurrowEpics } from './epic/create-burrow.epics'

export const burrowEpics = combineEpics(createBurrowEpics)
