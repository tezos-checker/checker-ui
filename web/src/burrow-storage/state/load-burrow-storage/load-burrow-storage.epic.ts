import { loadBurrowStorageRequest } from '@api'
import { AbstractAction, RequestStatus, RootState } from '@config'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { BurrowStorage, BurrowStorageRow } from '../burrow-storage.type'
import { getUpdateStorageAction } from '../update-burrow-storage/update-burrow-storage.util'
import { BurrowLoadStorageResultAction } from './load-burrow-storage.type'

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

export const loadBurrowStorageEpic = (
  action$: Observable<AbstractAction<BurrowStorageRow>>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    ofType('burrowStorage/loadStorage'),
    withLatestFrom(state$),
    map(([x, state]) => {
      const { burrowId } = x.payload
      const {
        wallet: { entities: walletEntities },
        burrow: { entities: burrowEntities },
      } = state

      return {
        burrowStorageRow: x.payload,
        walletAddress: walletEntities['1'].address || '',
        // eslint-disable-next-line
        // @ts-ignore
        scAddress: burrowEntities[burrowId.toString()].scAddress || '',
      }
    }),
    mergeMap((x) => getScStorage(x)),
  )
