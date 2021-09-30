import { RequestStatus } from '@config'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  totalSupply: BigNumber
  status: RequestStatus
}
export const useMetaViewTotalSupply = (checkerAddress: string): [Data, () => void] => {
  const [data, setData] = useState({
    totalSupply: zero,
    status: RequestStatus.pending,
  })

  useEffect(() => {
    const fetchData = async () => {
      // we want the load the data only when data.status === pending
      if (data.status !== RequestStatus.pending) {
        return
      }

      try {
        const metadataViews = await getMetaDataViews(checkerAddress)

        const totalSupply = await metadataViews.total_supply().executeView()

        setData({
          totalSupply: new BigNumber(totalSupply),
          status: RequestStatus.success,
        })
      } catch (error) {
        setData({ totalSupply: zero, status: RequestStatus.error })
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = () => {
    setData({
      totalSupply: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
