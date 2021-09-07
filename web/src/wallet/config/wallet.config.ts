import { BeaconWallet } from '@taquito/beacon-wallet'
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { Tzip16Module } from '@taquito/tzip16'

export type Checker = {
  address: string
  oracle: string
  name: string
  swapTitle: string
  buyFromSymbol: string
  buyToSymbol: string
}

const rpcNetworkList = {
  florencenet: {
    url: 'https://api.tez.ie/rpc/florencenet',
    networkType: 'florencenet',
    checkers: [
      {
        address: 'KT1PPL3svzkumTQfq4aXm9LfPnocAMCYQN2w',
        oracle: 'oracle',
        name: 'KIT',
        swapTitle: 'KIT/TEZOS',
        buyFromSymbol: 'CTEZ',
        buyToSymbol: 'KIT',
      },
    ],
  },
  granadanet: {
    url: 'https://api.tez.ie/rpc/granadanet',
    networkType: 'granadanet',
    checkers: [
      {
        address: 'KT1FfHEMmoDy8oDuckRinLdDBt4qS6JCQhoe',
        oracle: 'oracle',
        name: 'KIT',
        swapTitle: 'KIT/TEZOS',
        buyFromSymbol: 'CTEZ',
        buyToSymbol: 'KIT',
      },
    ],
  },
}

export const appNetwork = rpcNetworkList.granadanet

export const beaconWallet = new BeaconWallet({
  name: 'Checker',

  // eslint-disable-next-line
  // @ts-ignore
  preferredNetwork: 'granadenet',
})

export const tezos = new TezosToolkit(appNetwork.url)
tezos.setPackerProvider(new MichelCodecPacker())

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())

// if we use the same config, TezBridge will overribe beaconWallet
//  export const tezosWithSigner = new TezosToolkit(appNetwork.url)
//  tezosWithSigner.setPackerProvider(new MichelCodecPacker())
//  tezosWithSigner.setProvider({ signer: new TezBridgeSigner() })
