import { getStorage, RequestStatus } from '@api'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ScStorage } from './sc-storage.type'

const actionType = 'storage/loadStorage'

const createAction = (payload: ScStorage) => ({ type: actionType, payload })

export const fetchStorageRequest = (x: ScStorage) =>
  from(getStorage()).pipe(
    map((res: any) => {
      if (res) {
        return createAction({ ...x, status: RequestStatus.success, content: res })
      }
      return createAction({
        ...x,
        status: RequestStatus.error,
        errMsg: 'internal error',
        content: null,
      })
    }),
    catchError((err) =>
      of(createAction({ ...x, status: RequestStatus.error, errMsg: err.message, content: null })),
    ),
  )

const isRequestOnPending = (status: RequestStatus) => status === RequestStatus.pending

export const loadStorageEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: any) => x.payload),
    filter((x: ScStorage) => isRequestOnPending(x.status)),
    mergeMap((x: ScStorage) => fetchStorageRequest(x)),
  )
