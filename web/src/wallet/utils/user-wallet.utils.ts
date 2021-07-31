import { beaconWallet } from '../config/wallet.config'

// fixme rename method
export const isValidWalletAddress = (walletAddress?: string): boolean => Boolean(walletAddress)

// fixme rename method
export const getWalletPKH = async (): Promise<string> => {
  const walletPKH = await beaconWallet.getPKH()
  return walletPKH
}
