import { useEffect, useState } from 'react'
import TokenService from '../services/tokenContract.service'
import { UseTokenInformation } from '../utils/types'

const useTokenInformation = (tokenService: TokenService): Maybe<UseTokenInformation> => {
  const [tokenInformation, setTokenInformation] = useState<Maybe<UseTokenInformation>>(null)

  useEffect(() => {
    const fetchTokenInformation = async () => {
      const tokenInfo = await tokenService.getInformation()
      setTokenInformation(tokenInfo)
    }
    fetchTokenInformation()
  }, [tokenService])

  return tokenInformation
}

export default useTokenInformation
