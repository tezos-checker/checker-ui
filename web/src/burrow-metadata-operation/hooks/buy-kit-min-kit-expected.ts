import { RequestStatus, tezos, TzFormatMutezToTz, TzFormatTzToMutez } from '@config'
import { tzip16 } from '@taquito/tzip16'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

const zero = new BigNumber(0)
type Data = {
  ctez: BigNumber
  minKitExpected: BigNumber
  status: RequestStatus
}

export const useMetaViewBuyKitMinKitExpected = (
  checkerToken: string,
  setter: (minKitExpected: BigNumber) => void,
): [Data, (ctez: BigNumber) => void] => {
  const [data, setData] = useState({
    ctez: zero,
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
        // eslint-disable-next-line
        // @ts-ignore
        const contract = await tezos.contract.at(checkerToken, tzip16)

        // eslint-disable-next-line
        // @ts-ignore
        const metadataViews = await contract.tzip16().metadataViews()

        const minKitExpected = TzFormatMutezToTz(
          await metadataViews
            .buy_kit_min_kit_expected()
            .executeView(TzFormatTzToMutez(data.ctez).toNumber()),
        )

        setData({
          ctez: data.ctez,
          minKitExpected,
          status: RequestStatus.success,
        })

        setter(minKitExpected)
      } catch (error) {
        console.error(error)
        setData({ ctez: data.ctez, minKitExpected: zero, status: RequestStatus.error })
        setter(zero)
      }
    }

    fetchData()
  }, [setData, data])

  // reload is accessible only if status === error
  const load = (ctez: BigNumber) => {
    setData({
      ctez,
      minKitExpected: zero,
      status: RequestStatus.pending,
    })
  }

  return [{ ...data }, load]
}
