import { loadStorageRequest } from '@api'
import { BurrowOpeAction, BurrowOpeRowState } from '@burrow-operation'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { LoadStorageResultAction } from '../load-storage/load-storage.type'
import { BurrowStorage, BurrowStorageRow } from '../storage-state.type'
import { getUpdateStorageAction } from '../update-storage/update-storage.util'
import { getCreateStorageAction } from './create-storage-action.util'

export const getScStorage = ({
  storageRow,
  walletAddress,
  scAddress,
}: LoadBurrowStorageRequestParams): Observable<LoadStorageResultAction> =>
  from(loadStorageRequest(storageRow.burrowId, walletAddress, scAddress)).pipe(
    map((storage: BurrowStorage) => {
      if (storage) {
        return getUpdateStorageAction({
          ...storageRow,
          status: RequestStatus.success,
          storage,
          errorMsg: '',
        })
      }
      return getUpdateStorageAction({
        ...storageRow,
        status: RequestStatus.error,
        errorMsg: 'Internal error',
        storage: null,
      })
    }),
    catchError((err) =>
      of(
        getUpdateStorageAction({
          ...storageRow,
          status: RequestStatus.error,
          storage: null,
          errorMsg: err.message,
        }),
      ),
    ),
  )

type LoadBurrowStorageRequestParams = {
  storageRow: BurrowStorageRow
  walletAddress: string
  scAddress: string
}

export const createStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit'),
    map((x: BurrowOpeAction) => x.payload),
    filter((payload: BurrowOpeRowState) => payload.status === RequestStatus.pending),
    mergeMap((payload: BurrowOpeRowState) =>
      of(
        getCreateStorageAction({
          burrowId: payload.burrowId,
          status: RequestStatus.idle,
          errorMsg: '',
          storage: null,
        }),
      ),
    ),
  )
