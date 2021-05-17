import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'

export const tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet')
tezos.setPackerProvider(new MichelCodecPacker())
