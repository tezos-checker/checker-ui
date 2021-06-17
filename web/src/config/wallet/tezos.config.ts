import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'

// https://staging.api.edo2net.tzkt.io/ - '
export const tezos = new TezosToolkit('https://api.tez.ie/rpc/florencenet')
//  export const tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet')

tezos.setPackerProvider(new MichelCodecPacker())
