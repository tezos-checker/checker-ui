export type Checker = {
  address: string
  oracle: string
  name: string
  swapTitle: string
  buyFromSymbol: string
  buyToSymbol: string
}

export const mockedCheckers: Checker[] = [
  {
    address: 'KT1FfHEMmoDy8oDuckRinLdDBt4qS6JCQhoe',
    oracle: 'oracle',
    name: 'KIT',
    swapTitle: 'KIT/TEZOS',
    buyFromSymbol: 'CTEZ',
    buyToSymbol: 'KIT',
  },
]
