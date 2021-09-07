import { BeaconWalletSigner } from '../config/beacon-wallet-signer.class'
import { beaconWallet, tezos } from '../config/wallet.config'

export const connectWallet = async (): Promise<string> => {
  await beaconWallet.requestPermissions()
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
