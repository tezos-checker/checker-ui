import { RequestStatus } from '@config'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getSwapAddress } from '../api/checker.api'
import { getSwapBalance } from '../api/tezos-with-signer.api'
import { getWalletContract } from '../api/tezos.api'
import { getWalletPKH } from '../api/wallet.api'
import { TzFormatMutezToTz } from '../utils/tezos-formatter.utils'

const zero = new BigNumber(0)
type Data = {
  balance: BigNumber
  status: RequestStatus
}

export const useGetUserBalance = (
  checkerToken: string,
  setter: (balance: BigNumber) => void,
): [Data, (balance: BigNumber) => void] => {
  const [data, setData] = useState({
    balance: zero,
    status: RequestStatus.idle,
  })

  useEffect(() => {
    const fetchData = async () => {
      // we want the load the data only when data.status === pending
      if (data.status !== RequestStatus.pending) {
        return
      }

      try {
        debugger
        const walletPKH = await getWalletPKH()

        const checkerContract = await getWalletContract(checkerToken)

        const swapAddress = await getSwapAddress(checkerContract)
        const balance = TzFormatMutezToTz(await getSwapBalance(swapAddress, walletPKH))

        setData({
          balance,
          status: RequestStatus.success,
        })

        setter(balance)
      } catch (error) {
        console.error(error)
        setData({ balance: zero, status: RequestStatus.error })
        setter(zero)
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = (ctez: BigNumber) => {
    setData({
      balance: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
