import { RequestStatus } from '@config'
import { TzFormatMutezToTz, TzFormatTzToMutez } from '@wallet'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getMetaDataViews } from '../utils/meta-data-operation.utils'

const zero = new BigNumber(0)
type Data = {
  amount: BigNumber
  maxExpected: BigNumber
  status: RequestStatus
}

export const useMetaViewAddLiquidityMaxKitDeposed = (
  checkerToken: string,
  setter: (maxExpected: BigNumber) => void,
): [Data, (amount: BigNumber) => void] => {
  const [data, setData] = useState({
    amount: zero,
    maxExpected: zero,
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

        const maxExpected = TzFormatMutezToTz(
          await metadataViews
            .add_liquidity_max_kit_deposited()
            .executeView(TzFormatTzToMutez(data.amount).toNumber()),
        )

        setData({
          amount: data.amount,
          maxExpected,
          status: RequestStatus.success,
        })

        setter(maxExpected)
      } catch (error) {
        console.error(error)
        setData({ amount: data.amount, maxExpected: zero, status: RequestStatus.error })
        setter(zero)
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = (amount: BigNumber) => {
    setData({
      amount,
      maxExpected: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
