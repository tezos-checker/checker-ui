import { RequestStatus, tezos } from '@config'
import { mapBytesToString } from '@shared/utils'
import { tzip16 } from '@taquito/tzip16'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

const zero = new BigNumber(0)
type Data = {
  symbol: string
  status: RequestStatus
}

export const useMetaDataViewTokenMetaData = (
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
        // eslint-disable-next-line
        // @ts-ignore
        const contract = await tezos.contract.at(checkerToken, tzip16)

        // eslint-disable-next-line
        // @ts-ignore
        const metadataViews = await contract.tzip16().metadataViews()

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
