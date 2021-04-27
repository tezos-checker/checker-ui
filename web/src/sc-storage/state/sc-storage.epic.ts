import { getStorage, RequestStatus } from '@api'
import { isPendingRequest } from '@shared/utils'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ScStoragePayload } from './sc-storage.type'

const actionType = 'storage/loadStorage'

const createAction = (payload: ScStoragePayload) => ({ type: actionType, payload })

export const fetchStorageRequest = (x: ScStoragePayload) =>
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
    filter((x: ScStoragePayload) => isPendingRequest(x.status)),
    mergeMap((x: ScStoragePayload) => fetchStorageRequest(x)),
  )
