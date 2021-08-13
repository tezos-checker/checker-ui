import { combineEpics } from 'redux-observable'
import { burrowOpeBurnKitEpics } from '../burrow-ope-burn-kit/burrow-burn-kit.epics'
import { burrowOpeCreateBurrowEpics } from '../burrow-ope-create-burrow/burrow-ope-create-burrow.epics'
import { burrowOpeDepositCollateralEpics } from '../burrow-ope-deposit-collateral/burrow-deposit-collateral.epics'
import { burrowOpeMintKitEpics } from '../burrow-ope-mint-kit/burrow-ope-mint-kit.epics'
import { burrowOpeWithdrawCollateralEpics } from '../burrow-ope-withdraw-collateral/burrow-withdraw-collateral.epics'

export const burrowOpeEpics = combineEpics(
  burrowOpeCreateBurrowEpics,
  burrowOpeDepositCollateralEpics,
  burrowOpeWithdrawCollateralEpics,
  burrowOpeMintKitEpics,
  burrowOpeBurnKitEpics,
)
