import { AbstractAction, RequestStatus, RootState } from '@config'
import { LoadStorageResp } from '@storage'
import { appNetwork } from '@wallet'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { loadCheckerStorageRequest } from '../../api/checker-storage.api'
import { StorageRow } from '../storage-state.type'
import { getUpdateStorageAction } from '../update-storage/update-storage.util'
import { LoadStorageResultAction } from './load-storage.type'

export const getScStorage = ({
  storageRow,
  walletAddress,
  scAddress,
}: LoadBurrowStorageRequestParams): Observable<LoadStorageResultAction> =>
  from(loadCheckerStorageRequest(scAddress)).pipe(
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

export const loadCheckerStorageEpic = (
  action$: Observable<AbstractAction<StorageRow>>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    ofType('storage/loadCheckerStorage'),
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
        scAddress: appNetwork.checkers[0].address || '', // refactor nécessaire sur base des checkers
      }
    }),
    mergeMap((x) => getScStorage(x)),
  )
