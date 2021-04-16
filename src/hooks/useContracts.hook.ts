import { TezosToolkit } from '@taquito/taquito'
import { useEffect, useState } from 'react'
import { TOKEN_CONTRACT_ADDRESS as tokenContractAddress } from '../config/constants'
import TokenService from '../services/tokenContract.service'
import { Account } from '../utils/types'

const useContracts = (account: Maybe<Account>, taquito: TezosToolkit) => {
  const [tokenService, setTokenService] = useState<Maybe<TokenService>>(null)

  useEffect(() => {
    const initializeContract = async () => {
      const tokenServiceInstance = await TokenService.create(tokenContractAddress, taquito)
      setTokenService(tokenServiceInstance)
    }

    initializeContract()
    // eslint-disable-next-line
  }, [account])

  return tokenService
}

export default useContracts
