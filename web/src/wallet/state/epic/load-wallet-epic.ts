import { RequestStatus } from '@config'
import { errorToast, successToast } from '@shared/ui'
import { isPendingRequest } from '@shared/utils'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, timeout } from 'rxjs/operators'
import { loadWallet } from '../../api/wallet.api'
import { WalletRowState } from '../wallet-state.type'

const actionType = 'wallet/loadWallet'

const createAction = (payload: WalletRowState) => ({ type: actionType, payload })

export const fetchStorageRequest = (x: WalletRowState) =>
  from(loadWallet()).pipe(
    timeout(60000), // fix safari issue, when we close the beacon pop-up
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

export const loadWalletEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: any) => x.payload),
    filter((x: WalletRowState) => isPendingRequest(x.status)),
    mergeMap((x: WalletRowState) => fetchStorageRequest(x)),
  )
