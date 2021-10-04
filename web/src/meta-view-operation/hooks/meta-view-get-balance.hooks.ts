import { RequestStatus } from '@config'
import { useGetWallet } from '@wallet'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  balance: BigNumber
  status: RequestStatus
}
export const useMetaViewGetBalance = (checkerAddress: string): [Data, () => void] => {
  const { address: walletAdress } = useGetWallet()
  const [data, setData] = useState({
    balance: zero,
    status: RequestStatus.pending,
  })

  useEffect(() => {
    const fetchData = async () => {
      // we want the load the data only when data.status === pending
      if (data.status !== RequestStatus.pending) {
        return
      }
      console.log('useEffect')
      console.log(walletAdress)
      try {
        const metadataViews = await getMetaDataViews(checkerAddress)

        let balance = zero
        if (walletAdress !== undefined)
          balance = await metadataViews.get_balance().executeView(walletAdress)

        setData({
          balance: new BigNumber(balance),
          status: RequestStatus.success,
        })
      } catch (error) {
        setData({ balance: zero, status: RequestStatus.error })
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = () => {
    setData({
      balance: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
