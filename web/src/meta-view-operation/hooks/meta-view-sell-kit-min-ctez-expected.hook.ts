import { RequestStatus } from '@config'
import { TzFormatMutezToTz, TzFormatTzToMutez } from '@wallet'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  kit: BigNumber
  minCtezExpected: BigNumber
  status: RequestStatus
}

export const useMetaViewSellKitMinCtezExpected = (
  checkerToken: string,
  setter: (minCtezExpected: BigNumber) => void,
): [Data, (kit: BigNumber) => void] => {
  const [data, setData] = useState({
    kit: zero,
    minCtezExpected: zero,
    status: RequestStatus.idle, // this view has to be called manually
  })

  useEffect(() => {
    const fetchData = async () => {
      // we want the load the data only when data.status === pending
      if (data.status !== RequestStatus.pending) {
        return
      }

      try {
        const metadataViews = await getMetaDataViews(checkerToken)

        const minCtezExpected = TzFormatMutezToTz(
          await metadataViews
            .sell_kit_min_ctez_expected()
            .executeView(TzFormatTzToMutez(data.kit).toNumber()),
        )

        setData({
          kit: data.kit,
          minCtezExpected,
          status: RequestStatus.success,
        })

        setter(minCtezExpected)
      } catch (error) {
        console.error(error)
        setData({ kit: data.kit, minCtezExpected: zero, status: RequestStatus.error })
        setter(zero)
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = (kit: BigNumber) => {
    setData({
      kit,
      minCtezExpected: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
