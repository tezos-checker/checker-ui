import { loadWallet, RequestStatus } from '@api'
import { errorToast, successToast } from '@shared/ui'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, timeout } from 'rxjs/operators'
import { WalletPayload } from './wallet-state.type'

const actionType = 'wallet/loadWallet'

const createAction = (payload: WalletPayload) => ({ type: actionType, payload })

export const fetchStorageRequest = (x: WalletPayload) =>
  from(loadWallet()).pipe(
    timeout(30000),
    map((address: string) => {
      if (address) {
        successToast('Wallet', 'Wallet connected')
        return createAction({ ...x, status: RequestStatus.success, address })
      }
      errorToast('Wallet', 'Wallet connection failed')
      return createAction({
        ...x,
        status: RequestStatus.error,
        errMsg: 'internal error',
        address: undefined,
      })
    }),
    catchError((err) => {
      errorToast('Wallet', err.message)
      return of(
        createAction({
          ...x,
          status: RequestStatus.error,
          errMsg: err.message,
          address: undefined,
        }),
      )
    }),
  )

const isRequestOnPending = (status: RequestStatus) => status === RequestStatus.pending

export const loadWalletEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: any) => x.payload),
    filter((x: WalletPayload) => isRequestOnPending(x.status)),
    mergeMap((x: WalletPayload) => fetchStorageRequest(x)),
  )
