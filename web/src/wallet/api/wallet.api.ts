import { beaconWallet, tezos } from '@config'

export const connectWallet = async (): Promise<string> => {
  await beaconWallet.requestPermissions({
    // eslint-disable-next-line
    // @ts-ignore
    network: { type: 'florencenet' },
  })
  const adress = await beaconWallet.getPKH()
  tezos.setWalletProvider(beaconWallet)

  return adress
}
