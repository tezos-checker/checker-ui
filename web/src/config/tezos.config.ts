import { SC_ADDRESS } from '@config'
import { ContractAbstraction, TezosToolkit, Wallet, WalletProvider } from '@taquito/taquito'

class Tezos {
  private tezos: TezosToolkit
  /* eslint no-underscore-dangle: 0 */

  private _wallet: Wallet
  /* eslint no-underscore-dangle: 0 */

  private _smartContract: ContractAbstraction<Wallet> | undefined

  public constructor() {
    this.tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet')
    //  this.tezos.setWalletProvider(this._beaconWallet)
    this._wallet = this.tezos.wallet
    this.initialise()
  }

  async initialise() {
    try {
      this._smartContract = await this.tezos.wallet.at(SC_ADDRESS)
    } catch (error) {
      console.error('Error while loading smart contract')
    }
  }

  get smartContract(): ContractAbstraction<Wallet> {
    return this._smartContract as ContractAbstraction<Wallet>
  }

  get wallet() {
    return this._wallet
  }

  set walletProvider(wallet: WalletProvider) {
    this.tezos.setWalletProvider(wallet)
  }
}

export const tezos = new Tezos()
