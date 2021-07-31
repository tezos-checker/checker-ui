import { RequestStatus, tezos } from '@config'
import { tzip16 } from '@taquito/tzip16'
import { TzFormatMutezToTz, useGetWallet } from '@wallet'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

const zero = new BigNumber(0)
type Data = {
  maxMintableKits: BigNumber
  status: RequestStatus
}

export const useMetaViewMaxMintableKits = (
  checkerScAdress: string,
  burrowId: number,
): [Data, () => void] => {
  const { address: walletAdress } = useGetWallet()

  const [data, setData] = useState({
    maxMintableKits: zero,
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
        const contract = await tezos.contract.at(checkerScAdress, tzip16)

        // eslint-disable-next-line
        // @ts-ignore
        const metadataViews = await contract.tzip16().metadataViews()

        const maxMintableKits = TzFormatMutezToTz(
          await metadataViews.burrow_max_mintable_kit().executeView(walletAdress, burrowId),
        )

        setData({ maxMintableKits, status: RequestStatus.success })
      } catch (error) {
        setData({ maxMintableKits: zero, status: RequestStatus.error })
      }
    }

    fetchData()
  }, [checkerScAdress, burrowId, setData, data])

  // reload is accessible only if status === error
  const reload = () =>
    data.status === RequestStatus.error
      ? setData({
          maxMintableKits: zero,
          status: RequestStatus.pending,
        })
      : null

  return [{ ...data }, reload]
}
