import { beaconWallet, tezos } from '@config'

export const loadWallet = async (): Promise<string> => {
  // eslint-disable-next-line
  // @ts-ignore
  await beaconWallet.requestPermissions({ network: { type: 'edonet' } })
  const adress = await beaconWallet.getPKH()
  tezos.walletProvider = beaconWallet
  return adress
}
