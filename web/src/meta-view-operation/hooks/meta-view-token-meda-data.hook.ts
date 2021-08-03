import { RequestStatus } from '@config'
import { mapBytesToString } from '@shared/utils'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  symbol: string
  status: RequestStatus
}

export const useMetaViewTokenMetaData = (
  checkerToken: string,
  paramIndex: number,
): [Data, () => void] => {
  const [data, setData] = useState({
    symbol: '',
    status: RequestStatus.pending,
  })

  useEffect(() => {
    const fetchData = async () => {
      // we want the load the data only when data.status === pending
      if (data.status !== RequestStatus.pending) {
        return
      }

      try {
        const metadataViews = await getMetaDataViews(checkerToken)

        const tokenParam = await metadataViews.token_metadata().executeView(paramIndex)

        setData({
          symbol: mapBytesToString(tokenParam[1].get('symbol')),
          status: RequestStatus.success,
        })
      } catch (error) {
        setData({ symbol: '', status: RequestStatus.error })
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = () => {
    setData({
      symbol: '',
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
