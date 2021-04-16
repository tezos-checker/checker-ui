import { TezosToolkit } from '@taquito/taquito'
import React from 'react'
import { baseConfig } from '../config/constants'
import useAccount from '../hooks/useAccount.hook'
import useContracts from '../hooks/useContracts.hook'
import useTaquito from '../hooks/useTaquito.hook'
import useUpdater from '../hooks/useUpdater.hook'
import TezosSingleton from '../services/tezos-singleton.class'
import TokenService from '../services/tokenContract.service'
import { Account } from '../utils/types'

export interface IConnectedContext {
  account: Maybe<Account>
  setCurrentAccount: (account: Account) => void
  clearCurrentAccount: () => void
  tokenService: Maybe<TokenService>
  updateFlag: boolean
  setUpdateFlag: (flag: boolean) => void
  taquito: TezosToolkit
}

const taquito = TezosSingleton.getInstance()
taquito.setProvider({ ...baseConfig })

export const CONNECTED_CONTEXT_DEFAULT_VALUE = {
  account: null,
  setCurrentAccount: () => {},
  clearCurrentAccount: () => {},
  tokenService: null,
  updateFlag: false,
  setUpdateFlag: () => {},
  taquito,
}

const ConnectedContext = React.createContext<IConnectedContext>(CONNECTED_CONTEXT_DEFAULT_VALUE)

interface Props {
  children: React.ReactNode
}

export const ConnectedNetwork = (props: Props) => {
  const { account, setCurrentAccount, clearCurrentAccount } = useAccount()
  const taquitoAccount = useTaquito(account)
  const useUpdaterValue = useUpdater()
  const tokenService = useContracts(account, taquitoAccount)

  const value = {
    account,
    setCurrentAccount,
    clearCurrentAccount,
    ...useUpdaterValue,
    tokenService,
    taquito: taquitoAccount,
  }

  return <ConnectedContext.Provider value={value}>{props.children}</ConnectedContext.Provider>
}

export const useConnectedContext = (): IConnectedContext => React.useContext(ConnectedContext)
