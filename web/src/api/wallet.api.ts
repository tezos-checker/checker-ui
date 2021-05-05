import { beaconWallet, tezos } from '@config'

export const loadWallet = async (): Promise<string> => {
  await beaconWallet.requestPermissions({
    // eslint-disable-next-line
    // @ts-ignore
    network: { type: 'edonet' },
  })
  const adress = await beaconWallet.getPKH()
  tezos.setWalletProvider(beaconWallet)

  return adress
}
