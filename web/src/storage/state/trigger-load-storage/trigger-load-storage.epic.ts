import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators'
import { BurrowOpeRowState } from 'src/burrow-operation/state/burrow-ope-state.type'
import { getLoadStorageAction } from '../load-storage/load-storage-action.util'

const isACompletedOperation = (x: BurrowOpeRowState) => x.status === RequestStatus.success

// Put here all the burrow operations that should perform a storage refresh
export const triggerLoadStorageEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType(
      'burrowOpe/createBurrowConfirm',
      'burrowOpe/depositTezConfirm',
      'burrowOpe/mintKitConfirm',
      'burrowOpe/burnKitConfirm',
      'burrowOpe/withdrawTezConfirm',
    ),
    withLatestFrom(state$),
    filter(([x, state]) => isACompletedOperation(x.payload)),
    mergeMap(([x, state]) => of(getLoadStorageAction(state.storage.entities[x.payload.burrowId]))),
  )
