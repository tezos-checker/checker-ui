import { BurrowOpeRowState } from '@burrow-operation'
import { AbstractAction, RootState } from '@config'
import { combineEpics, ofType } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { getCreateBurrowAction } from './create-burrow-action.util'

const createBurrowEpic = (
  action$: Observable<AbstractAction<BurrowOpeRowState>>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit', 'burrowOpe/createBurrowConfirm'),
    withLatestFrom(state$),
    mergeMap(([x, state]) => {
      const { burrowId, scAddress } = x.payload
      return of(
        getCreateBurrowAction({
          burrowId,
          scAddress,
          // eslint-disable-next-line
          // @ts-ignore
          walletAddress: state.wallet.entities['1'].address,
        }),
      )
    }),
  )

export const createBurrowEpics = combineEpics(createBurrowEpic)
