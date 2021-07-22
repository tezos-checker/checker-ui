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
    address: 'KT1PPL3svzkumTQfq4aXm9LfPnocAMCYQN2w',
    oracle: 'oracle',
    name: 'KIT',
    swapTitle: 'KIT/TEZOS',
    buyFromSymbol: 'CTEZ',
    buyToSymbol: 'KIT',
  },
]
