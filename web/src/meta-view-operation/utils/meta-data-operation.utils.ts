import { tzip16 } from '@taquito/tzip16'
import { tezos } from '@wallet'

export const getMetaDataViews = async (checkerAddress: string): Promise<any> => {
  // eslint-disable-next-line
  // @ts-ignore
  const contract = await tezos.contract.at(checkerAddress, tzip16)

  // eslint-disable-next-line
  // @ts-ignore
  const metadataViews = await contract.tzip16().metadataViews()

  return metadataViews
}
