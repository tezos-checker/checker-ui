import { loadBurrowStorageRequest } from '@api'
import { BurrowOpeAction, BurrowOpeRowState } from '@burrow-operation'
import { RequestStatus } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { BurrowStorage, BurrowStorageRow } from '../burrow-storage.type'
import { BurrowLoadStorageResultAction } from '../load-burrow-storage/load-burrow-storage.type'
import { getUpdateStorageAction } from '../update-burrow-storage/update-burrow-storage.util'
import { getCreateBurrowStorageAction } from './create-burrow-action.util'

export const getScStorage = ({
  burrowStorageRow,
  walletAddress,
  scAddress,
}: LoadBurrowStorageRequestParams): Observable<BurrowLoadStorageResultAction> =>
  from(loadBurrowStorageRequest(burrowStorageRow.burrowId, walletAddress, scAddress)).pipe(
    map((storage: BurrowStorage) => {
      if (storage) {
        return getUpdateStorageAction({
          ...burrowStorageRow,
          status: RequestStatus.success,
          storage,
          errorMsg: '',
        })
      }
      return getUpdateStorageAction({
        ...burrowStorageRow,
        status: RequestStatus.error,
        errorMsg: 'Internal error',
        storage: null,
      })
    }),
    catchError((err) =>
      of(
        getUpdateStorageAction({
          ...burrowStorageRow,
          status: RequestStatus.error,
          storage: null,
          errorMsg: err.message,
        }),
      ),
    ),
  )

type LoadBurrowStorageRequestParams = {
  burrowStorageRow: BurrowStorageRow
  walletAddress: string
  scAddress: string
}

export const createBurrowStorageEpic = (action$: any) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit'),
    map((x: BurrowOpeAction) => x.payload),
    filter((payload: BurrowOpeRowState) => payload.status === RequestStatus.pending),
    mergeMap((payload: BurrowOpeRowState) =>
      of(
        getCreateBurrowStorageAction({
          burrowId: payload.burrowId,
          status: RequestStatus.idle,
          errorMsg: '',
          storage: null,
        }),
      ),
    ),
  )
