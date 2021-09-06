/* eslint-disable */
import { BeaconWallet } from '@taquito/beacon-wallet'
import { Signer } from '@taquito/taquito'

export class BeaconWalletSigner implements Signer {
  constructor(private _beaconWallet: BeaconWallet) {}

  sign(
    op: {},
    magicByte?: Uint8Array,
  ): Promise<{ bytes: string; sig: string; prefixSig: string; sbytes: string }> {
    debugger
    console.log(op, magicByte)
    throw new Error('Method not implemented.')
  }
  publicKey(): Promise<string> {
    return this._beaconWallet.client.getActiveAccount().then(
      (x) =>
        new Promise<string>((resolve, reject) => {
          x?.publicKey
        }),
    )
  }
  publicKeyHash(): Promise<string> {
    return this._beaconWallet.getPKH()
  }
  secretKey(): Promise<string | undefined> {
    return new Promise<undefined>((resolve, reject) => {
      resolve(undefined)
    })
  }
}
