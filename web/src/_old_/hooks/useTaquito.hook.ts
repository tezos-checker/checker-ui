import { InMemorySigner } from '@taquito/signer'
import { TezosToolkit } from '@taquito/taquito'
import { baseConfig } from '../config/constants'
import TezosSingleton from '../services/tezos-singleton.class'

import { Account } from '../utils/types'

const useTaquito = (account: Maybe<Account>): TezosToolkit => {
  const signer = account
    ? InMemorySigner.fromFundraiser(account.email, account.password, account.mnemonic.join(' '))
    : undefined

  const taquito = TezosSingleton.getInstance()
  taquito.setProvider({ ...baseConfig, signer })

  return taquito
}

export default useTaquito
