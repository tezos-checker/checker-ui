import { loadBurrowStorageRequest } from '@api'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import {
  BurrowLoadStorageAction,
  BurrowLoadStoragePayload,
  BurrowLoadStorageResultAction,
} from '../burrow-storage.action/burrow-storage-action.type'
import { getUpdateStorageAction } from '../burrow-storage.action/burrow-storage-action.util'
import { BurrowStorage } from '../burrow-storage.type'

export const getScStorage = (
  payload: BurrowLoadStoragePayload,
): Observable<BurrowLoadStorageResultAction> =>
  from(loadBurrowStorageRequest(1, 'TOBEDEFINED', payload.scAddress)).pipe(
    map((storage: BurrowStorage) => {
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
        errorMsg: 'Internal error',
        storage: null,
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

export const loadBurrowStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrow/loadStorage'),
    map((x: BurrowLoadStorageAction) => x.payload),
    mergeMap((x: BurrowLoadStoragePayload) => getScStorage(x)),
  )
