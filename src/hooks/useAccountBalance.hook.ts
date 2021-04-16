import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import TokenService from '../services/tokenContract.service'
import { getAddressFromAccount } from '../utils/tool'
import { Account } from '../utils/types'

interface UseAccountBalanceValue {
  balance: BigNumber
}

const useAccountBalance = (
  account: Maybe<Account>,
  tokenService: TokenService,
  updateFlag: boolean,
): UseAccountBalanceValue => {
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const address = await getAddressFromAccount(account)
        const tokenBalance = await tokenService.getBalance(address)
        setBalance(tokenBalance)
      }
    }
    fetchBalance()
  }, [account, tokenService, updateFlag])

  return {
    balance,
  }
}
export default useAccountBalance
