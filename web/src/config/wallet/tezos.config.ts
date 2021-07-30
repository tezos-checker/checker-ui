import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import { Tzip16Module } from '@taquito/tzip16'

export const tezos = new TezosToolkit('https://api.tez.ie/rpc/florencenet')

tezos.setPackerProvider(new MichelCodecPacker())
tezos.setProvider({ signer: new TezBridgeSigner() })

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())
