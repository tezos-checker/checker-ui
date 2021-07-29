import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import { Tzip16Module } from '@taquito/tzip16'

// https://staging.api.edo2net.tzkt.io/ - '
export const tezos = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
//  export const tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet')

tezos.setPackerProvider(new MichelCodecPacker())
tezos.setProvider({ signer: new TezBridgeSigner() })

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())
