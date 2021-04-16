import React, { useEffect } from 'react'
import { Account } from '../utils/types'

interface UseAccountValue {
  account: Maybe<Account>
  setCurrentAccount: (account: Account) => void
  clearCurrentAccount: () => void
}

const itemNameStorage = 'account'

const useAccount = (): UseAccountValue => {
  const [account, setAccount] = React.useState<Maybe<Account>>(null)

  useEffect(() => {
    const initializeAccount = async () => {
      try {
        const item = window.localStorage.getItem(itemNameStorage)
        const storageAccount = item ? JSON.parse(item) : null
        setAccount(storageAccount)
      } catch (error) {
        setAccount(null)
      }
    }

    initializeAccount()
  }, [])

  const setCurrentAccount = React.useCallback((currentAaccount: Account): void => {
    setAccount(currentAaccount)
    window.localStorage.setItem(itemNameStorage, JSON.stringify(currentAaccount))
  }, [])

  const clearCurrentAccount = () => {
    localStorage.removeItem(itemNameStorage)
  }

  return {
    account,
    setCurrentAccount,
    clearCurrentAccount,
  }
}
export default useAccount
