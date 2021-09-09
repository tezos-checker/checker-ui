import { BeaconWalletSigner } from '../config/beacon-wallet-signer.class'
import { appNetwork, beaconWallet, tezos } from '../config/wallet.config'

export const connectWallet = async (): Promise<string> => {
  // ask which wallet to use ( temple, kukai,...)
  await beaconWallet.clearActiveAccount()
  await beaconWallet.requestPermissions({
    // eslint-disable-next-line
    // @ts-ignore
    network: { type: appNetwork.networkType },
  })

  const adress = await beaconWallet.getPKH()

  //  tezos.setWalletProvider(beaconWallet)
  tezos.setProvider({ signer: new BeaconWalletSigner(beaconWallet), wallet: beaconWallet })

  return adress
}

// fixme rename method
export const getWalletPKH = async (): Promise<string> => {
  const walletPKH = await beaconWallet.getPKH()
  return walletPKH
}
