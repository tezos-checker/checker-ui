import { beaconWallet } from '@config'

export const isValidWalletAddress = (walletAddress?: string): boolean => Boolean(walletAddress)

export const getWalletPKH = async (): Promise<string> => {
  const walletPKH = await beaconWallet.getPKH()
  return walletPKH
}
