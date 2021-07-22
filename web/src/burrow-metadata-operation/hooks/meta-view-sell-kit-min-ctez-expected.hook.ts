import { RequestStatus, tezos, TzFormatMutezToTz, TzFormatTzToMutez } from '@config'
import { tzip16 } from '@taquito/tzip16'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

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
        // eslint-disable-next-line
        // @ts-ignore
        const contract = await tezos.contract.at(checkerToken, tzip16)

        // eslint-disable-next-line
        // @ts-ignore
        const metadataViews = await contract.tzip16().metadataViews()

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
