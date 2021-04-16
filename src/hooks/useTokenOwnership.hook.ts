import { useEffect, useState } from 'react'
import TokenService from '../services/tokenContract.service'
import { getAddressFromAccount } from '../utils/tool'
import { Account } from '../utils/types'

const useTokenOwnership = (account: Maybe<Account>, tokenService: TokenService): boolean => {
  const [owner, setOwner] = useState<boolean>(false)

  useEffect(() => {
    const fetchOwnership = async () => {
      if (account) {
        const address = await getAddressFromAccount(account)
        const isOwner = await tokenService.isOwner(address)
        setOwner(isOwner)
      }
    }
    fetchOwnership()
  }, [account, tokenService])

  return owner
}

export default useTokenOwnership
