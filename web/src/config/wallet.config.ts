import { BeaconWallet } from '@taquito/beacon-wallet'
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import { Tzip16Module } from '@taquito/tzip16'

export const beaconWallet = new BeaconWallet({
  name: 'Checker',
})

export const tezos = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
tezos.setPackerProvider(new MichelCodecPacker())

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())

// if we use the same config, TezBridge will overribe beaconWallet
export const tezosWithSigner = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
tezosWithSigner.setPackerProvider(new MichelCodecPacker())
tezosWithSigner.setProvider({ signer: new TezBridgeSigner() })
