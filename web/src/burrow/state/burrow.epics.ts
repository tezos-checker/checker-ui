import { combineEpics } from 'redux-observable'
import { createBurrowEpics } from './create-burrow/create-burrow.epics'

export const burrowEpics = combineEpics(createBurrowEpics)
