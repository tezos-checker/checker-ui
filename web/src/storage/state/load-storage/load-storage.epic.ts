import { loadStorageRequest } from '@api'
import { AbstractAction, RequestStatus, RootState } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { CheckerStorage, StorageRow } from '../storage-state.type'
import { getUpdateStorageAction } from '../update-storage/update-storage.util'
import { LoadStorageResultAction } from './load-storage.type'

export const getScStorage = ({
  storageRow,
  walletAddress,
  scAddress,
}: LoadBurrowStorageRequestParams): Observable<LoadStorageResultAction> =>
  from(loadStorageRequest(storageRow.burrowId, walletAddress, scAddress)).pipe(
    map((storage: CheckerStorage) => {
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

export const loadStorageEpic = (
  action$: Observable<AbstractAction<StorageRow>>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    ofType('storage/loadStorage'),
    withLatestFrom(state$),
    map(([x, state]) => {
      const { burrowId } = x.payload
      const {
        wallet: { entities: walletEntities },
        burrow: { entities: burrowEntities },
      } = state

      return {
        storageRow: x.payload,
        walletAddress: walletEntities['1'].address || '',
        // eslint-disable-next-line
        // @ts-ignore
        scAddress: burrowEntities[burrowId.toString()].scAddress || '',
      }
    }),
    mergeMap((x) => getScStorage(x)),
  )
