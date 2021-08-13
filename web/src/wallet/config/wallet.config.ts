import { BeaconWallet } from '@taquito/beacon-wallet'
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito'
import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import { Tzip16Module } from '@taquito/tzip16'

const rpcNetworkList = {
  florencenet: {
    url: 'https://api.tez.ie/rpc/florencenet',
    networkType: 'florencenet',
  },
  granadanet: {
    url: 'https://api.tez.ie/rpc/granadanet',
    networkType: 'granadanet',
  },
}

export const appNetwork = rpcNetworkList.granadanet

export const beaconWallet = new BeaconWallet({
  name: 'Checker',
})

export const tezos = new TezosToolkit(appNetwork.url)
tezos.setPackerProvider(new MichelCodecPacker())

// eslint-disable-next-line
// @ts-ignore
tezos.addExtension(new Tzip16Module())

// if we use the same config, TezBridge will overribe beaconWallet
export const tezosWithSigner = new TezosToolkit(appNetwork.url)
tezosWithSigner.setPackerProvider(new MichelCodecPacker())
tezosWithSigner.setProvider({ signer: new TezBridgeSigner() })
