import { appNetwork, beaconWallet, tezos } from '../config/wallet.config'

export const connectWallet = async (): Promise<string> => {
  await beaconWallet.requestPermissions({
    // eslint-disable-next-line
    // @ts-ignore
    network: { type: appNetwork.networkType },
  })
  const adress = await beaconWallet.getPKH()
  tezos.setWalletProvider(beaconWallet)

  return adress
}
