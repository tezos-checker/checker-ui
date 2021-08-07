import { RequestStatus } from '@config'
import { TzFormatMutezToTz, TzFormatTzToMutez } from '@wallet'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  amount: BigNumber
  minKitExpected: BigNumber
  status: RequestStatus
}

export const useMetaViewRemoveLiquidityMinKitWithdrawn = (
  checkerToken: string,
  setter: (minKitExpected: BigNumber) => void,
): [Data, (amount: BigNumber) => void] => {
  const [data, setData] = useState({
    amount: zero,
    minKitExpected: zero,
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

        const minKitExpected = TzFormatMutezToTz(
          await metadataViews
            .remove_liquidity_min_kit_withdrawn()
            .executeView(TzFormatTzToMutez(data.amount).toNumber()),
        )

        setData({
          amount: data.amount,
          minKitExpected,
          status: RequestStatus.success,
        })

        setter(minKitExpected)
      } catch (error) {
        console.error(error)
        setData({ amount: data.amount, minKitExpected: zero, status: RequestStatus.error })
        setter(zero)
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = (amount: BigNumber) => {
    setData({
      amount,
      minKitExpected: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
