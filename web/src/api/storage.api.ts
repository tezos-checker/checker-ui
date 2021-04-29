import { tezos } from '@config'

export const getStorage = async (): Promise<any> => {
  const sc = await tezos.smartContract
  return sc.storage()
}
