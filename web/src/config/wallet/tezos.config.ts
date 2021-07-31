import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import { Tzip16Module } from '@taquito/tzip16'

export const tezos = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
tezos.setPackerProvider(new MichelCodecPacker())

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())

// if we use the same config, TezBridge will overribe beaconWallet
export const tezosSigner = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
tezosSigner.setPackerProvider(new MichelCodecPacker())
tezosSigner.setProvider({ signer: new TezBridgeSigner() })
