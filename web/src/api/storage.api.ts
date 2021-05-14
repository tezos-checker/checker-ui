import { getContract } from '@config'

export const getStorage = async (
  burrowId: string,
  walletPublickKey: string,
  scAddress: string,
): Promise<any> => {
  // eslint-disable-next-line
  const contract = await getContract(scAddress)
  const storage = await contract.storage()
  // eslint-disable-next-line
  debugger
  return (storage as any)[1].sealed.burrows.get({
    0: 'tz1KkfyXMdRtgTPnKCS7ANDPduEq82RxLGNV', // address
    1: 51,
  })
}
