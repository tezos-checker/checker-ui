import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators'
import { BurrowOpeRowState } from 'src/burrow-operation/state/burrow-ope-state.type'
import { getLoadStorageAction } from '../load-burrow-storage/load-burrow-storage.util'

const isACompletedOperation = (x: BurrowOpeRowState) => x.status === RequestStatus.success

// Put here all the burrow operations that should perform a storage refresh
export const triggerLoadBurrowStorageEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType('operation/createBurrowConfirm', 'operation/depositTezConfirm'),
    withLatestFrom(state$),
    filter(([x, state]) => isACompletedOperation(x.payload)),
    mergeMap(([payload, state]) =>
      of(getLoadStorageAction(state.burrowStorage.entities[payload.burrowId])),
    ),
  )
