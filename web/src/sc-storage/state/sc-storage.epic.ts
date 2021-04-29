import { getStorage, RequestStatus } from '@api'
import { isPendingRequest } from '@shared/utils'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ScStorageRowState } from './sc-storage.type'

const actionType = 'storage/loadStorage'

const createAction = (payload: ScStorageRowState) => ({ type: actionType, payload })

export const fetchStorageRequest = (x: ScStorageRowState) =>
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

export const loadStorageEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: any) => x.payload),
    filter((x: ScStorageRowState) => isPendingRequest(x.status)),
    mergeMap((x: ScStorageRowState) => fetchStorageRequest(x)),
  )
