import { tezos, wallet } from '@config'

export const connectWallet = async (): Promise<string> => {
  // eslint-disable-next-line
  // @ts-ignore
  await wallet.requestPermissions({ network: { type: 'edonet' } })
  const adress = await wallet.getPKH()
  tezos.setWalletProvider(wallet)
  return adress
}
