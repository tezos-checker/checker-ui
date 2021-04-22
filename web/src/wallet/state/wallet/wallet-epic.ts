import { connectWallet } from '@api'
import { AxiosError } from 'axios'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { WalletConnectErrorAction, WalletConnectSuccessAction } from './wallet-reducer'

const createSuccessAction = (payload: string): WalletConnectSuccessAction => ({
  type: 'wallet/connectSuccess',
  payload,
})

const createErrorAction = (payload: string): WalletConnectErrorAction => ({
  type: 'wallet/connectError',
  payload,
})

const connectToWallet = () =>
  from(connectWallet()).pipe(
    map((res: string) => (res ? createSuccessAction(res) : createErrorAction(res))),
    catchError((err: AxiosError) => of(createErrorAction(err.message))),
  )

export const connectWalletEpic = (action$: any) =>
  action$.pipe(
    ofType('wallet/connect'),
    mergeMap((_) => connectToWallet()),
    catchError((err) => of(createErrorAction(err.message))),
  )
