import { connectWallet } from '@api'
import { errorToast, successToast } from '@shared/ui'
import { AxiosError } from 'axios'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { WalletConnectErrorAction, WalletConnectSuccessAction } from './wallet-reducer'

const getSuccessActionAndToastSuccess = (payload: string): WalletConnectSuccessAction => {
  successToast('Wallet', 'Connected')
  return {
    type: 'wallet/connectSuccess',
    payload,
  }
}

const getErrorActionAndToastError = (payload: string): WalletConnectErrorAction => {
  errorToast('Wallet', payload)
  return {
    type: 'wallet/connectError',
    payload,
  }
}

const connectToWallet = () =>
  from(connectWallet()).pipe(
    map((res: string) =>
      res ? getSuccessActionAndToastSuccess(res) : getErrorActionAndToastError(res),
    ),
    catchError((err: AxiosError) => of(getErrorActionAndToastError(err.message))),
  )

export const connectWalletEpic = (action$: any) =>
  action$.pipe(
    ofType('wallet/connect'),
    mergeMap((_) => connectToWallet()),
    catchError((err) => of(getErrorActionAndToastError(err.message))),
  )
