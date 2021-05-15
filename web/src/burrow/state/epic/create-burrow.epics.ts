import { BurrowOpeAction, BurrowOpeRowState } from '@burrow-operation'
import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { getCreateBurrowAction } from '../action/burrow-creation.action/burrow-creation-action.util'

const createBurrowEpic = (action$: any) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit', 'burrowOpe/createBurrowConfirm'),
    map((x: BurrowOpeAction) => x.payload),
    mergeMap((x: BurrowOpeRowState) =>
      of(
        getCreateBurrowAction({
          burrowId: x.burrowId,
          scAddress: x.scAddress,
        }),
      ),
    ),
  )

export const createBurrowEpics = combineEpics(createBurrowEpic)
