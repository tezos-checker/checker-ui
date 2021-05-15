import { combineEpics } from 'redux-observable'
import { burrowOpeCreateBurrowEpics } from '../burrow-ope-create-burrow/burrow-ope-create-burrow.epics'
import { burrowOpeDepositTezEpics } from '../burrow-ope-deposit-tez/burrow-deposit-tez.epics'

export const burrowOpeEpics = combineEpics(burrowOpeCreateBurrowEpics, burrowOpeDepositTezEpics)