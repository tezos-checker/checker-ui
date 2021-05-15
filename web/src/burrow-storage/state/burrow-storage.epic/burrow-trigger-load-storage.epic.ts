import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import {
  BurrowOpeAction,
  BurrowOpeRowState,
} from 'src/burrow-operation/state/burrow-ope-state.type'
import { getLoadStorageAction } from '../burrow-storage.action/burrow-storage-action.util'

const isACompletedOperation = (x: BurrowOpeRowState) =>
  x.status === RequestStatus.error || x.status === RequestStatus.success

// Put here all the burrow operations that should perform a storage refresh
export const triggerLoadBurrowStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('operation/createBurrowSubmit', 'operation/depositTezConfirm'),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isACompletedOperation(x)),
    map((x: BurrowOpeRowState) =>
      getLoadStorageAction({
        burrowId: x.burrowId,
        scAddress: x.scAddress,
      }),
    ),
  )
