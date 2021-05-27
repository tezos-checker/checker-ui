import { combineEpics } from 'redux-observable'
import { burrowOpeBurnKitEpics } from '../burrow-ope-burn-kit/burrow-burn-kit.epics'
import { burrowOpeBuyKitEpics } from '../burrow-ope-buy-kit/burrow-buy-kit.epics'
import { burrowOpeCreateBurrowEpics } from '../burrow-ope-create-burrow/burrow-ope-create-burrow.epics'
import { burrowOpeDepositTezEpics } from '../burrow-ope-deposit-tez/burrow-deposit-tez.epics'
import { burrowOpeMintKitEpics } from '../burrow-ope-mint-kit/burrow-ope-mint-kit.epics'

export const burrowOpeEpics = combineEpics(
  burrowOpeCreateBurrowEpics,
  burrowOpeDepositTezEpics,
  burrowOpeMintKitEpics,
  burrowOpeBurnKitEpics,
  burrowOpeBuyKitEpics,
)
