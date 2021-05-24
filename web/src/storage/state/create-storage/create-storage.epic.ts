import { loadStorageRequest, LoadStorageResp } from '@api'
import { BurrowOpeAction, BurrowOpeRowState } from '@burrow-operation'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { LoadStorageResultAction } from '../load-storage/load-storage.type'
import { StorageRow } from '../storage-state.type'
import { getUpdateStorageAction } from '../update-storage/update-storage.util'
import { getCreateStorageAction } from './create-storage-action.util'

export const getScStorage = ({
  storageRow,
  walletAddress,
  scAddress,
}: LoadBurrowStorageRequestParams): Observable<LoadStorageResultAction> =>
  from(loadStorageRequest(storageRow.burrowId, walletAddress, scAddress)).pipe(
    map((res: LoadStorageResp) => {
      if (res) {
        return getUpdateStorageAction({
          ...storageRow,
          status: RequestStatus.success,
          burrowStorage: res.burrowStorage,
          checkerStorage: res.checkerStorage,
          errorMsg: '',
        })
      }
      return getUpdateStorageAction({
        ...storageRow,
        status: RequestStatus.error,
        errorMsg: 'Internal error',
      })
    }),
    catchError((err) =>
      of(
        getUpdateStorageAction({
          ...storageRow,
          status: RequestStatus.error,
          errorMsg: err.message,
        }),
      ),
    ),
  )

type LoadBurrowStorageRequestParams = {
  storageRow: StorageRow
  walletAddress: string
  scAddress: string
}

export const createStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit'),
    map((x: BurrowOpeAction) => x.payload),
    filter((payload: BurrowOpeRowState) => payload.status === RequestStatus.pending),
    mergeMap((payload: BurrowOpeRowState) => of(getCreateStorageAction(payload.burrowId))),
  )
