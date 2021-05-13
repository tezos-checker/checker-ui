import { getStorage } from '@api'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map } from 'rxjs/operators'
import { ScOperationAction, ScOperationRowState } from 'src/sc-operation/state/sc-ope-state.type'
import {
  BurrowLoadStorageActionPayload,
  BurrowLoadStorageResultAction,
} from '../../action/burrow-storage.action/burrow-storage-action.type'
import {
  getLoadBurrowStorageAction,
  getLoadBurrowStorageResultAction,
} from '../../action/burrow-storage.action/burrow-storage-action.util'

export const getScStorage = (
  payload: BurrowLoadStorageActionPayload,
): Observable<BurrowLoadStorageResultAction> =>
  from(getStorage(payload.scAddress)).pipe(
    map((storage: any) => {
      if (storage) {
        return getLoadBurrowStorageResultAction({
          status: RequestStatus.success,
          storage,
          errorMsg: '',
          ...payload,
        })
      }
      return getLoadBurrowStorageResultAction({
        status: RequestStatus.error,
        storage: null,
        errorMsg: 'Internal error',
        ...payload,
      })
    }),
    catchError((err) =>
      of(
        getLoadBurrowStorageResultAction({
          status: RequestStatus.error,
          storage: null,
          errorMsg: err.message,
          ...payload,
        }),
      ),
    ),
  )

const isACompletedOperation = (x: ScOperationRowState) =>
  x.status === RequestStatus.error || x.status === RequestStatus.success

// Put here all the operation actions that should perform a storage refresh
export const burrowTriggerLoadStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('operation/createBurrowSubmit', 'operation/depositTezConfirm'),
    map((x: ScOperationAction) => x.payload),
    filter((x: ScOperationRowState) => isACompletedOperation(x)),
    map((x: ScOperationRowState) =>
      getLoadBurrowStorageAction({
        burrowId: x.burrowId,
        scAddress: x.scAddress,
      }),
    ),
  )
