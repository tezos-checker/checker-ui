import { getStorage } from '@api'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
  BurrowLoadStorageAction,
  BurrowLoadStorageActionPayload,
  BurrowLoadStorageResultAction,
} from '../../action/burrow-storage.action/burrow-storage-action.type'
import { getLoadBurrowStorageResultAction } from '../../action/burrow-storage.action/burrow-storage-action.util'

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

export const loadBurrowStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrow/loadBurrowStorage'),
    map((x: BurrowLoadStorageAction) => x.payload),
    map((x: BurrowLoadStorageActionPayload) => getScStorage(x)),
  )
