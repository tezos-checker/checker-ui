import { getStorage } from '@api'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import {
  BurrowLoadStorageAction,
  BurrowLoadStorageActionPayload,
  BurrowLoadStorageResultAction,
} from '../../action/burrow-storage.action/burrow-storage-action.type'
import { getUpdateStorageAction } from '../../action/burrow-storage.action/burrow-storage-action.util'

export const getScStorage = (
  payload: BurrowLoadStorageActionPayload,
): Observable<BurrowLoadStorageResultAction> =>
  from(getStorage(payload.scAddress)).pipe(
    map((storage: any) => {
      if (storage) {
        return getUpdateStorageAction({
          status: RequestStatus.success,
          storage,
          errorMsg: '',
          ...payload,
        })
      }
      return getUpdateStorageAction({
        status: RequestStatus.error,
        storage: null,
        errorMsg: 'Internal error',
        ...payload,
      })
    }),
    catchError((err) =>
      of(
        getUpdateStorageAction({
          status: RequestStatus.error,
          storage: null,
          errorMsg: err.message,
          ...payload,
        }),
      ),
    ),
  )

export const burrowLoadStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrow/loadStorage'),
    map((x: BurrowLoadStorageAction) => x.payload),
    mergeMap((x: BurrowLoadStorageActionPayload) => getScStorage(x)),
  )
