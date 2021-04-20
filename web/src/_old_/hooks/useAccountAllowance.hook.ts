import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import TokenService from '../services/tokenContract.service'

interface UseAccountAllowanceValue {
  allowance: BigNumber
}

const useAccountAllowance = (
  addressFrom: string,
  addressTo: string,
  tokenService: TokenService,
): UseAccountAllowanceValue => {
  const [allowance, setAllowance] = useState<BigNumber>(new BigNumber(0))

  useEffect(() => {
    const fetchAllowance = async () => {
      const tokenAllowance = await tokenService.getAllowance(addressFrom, addressTo)
      setAllowance(tokenAllowance)
    }
    fetchAllowance()
  }, [addressFrom, addressTo, tokenService])

  return {
    allowance,
  }
}

export default useAccountAllowance
