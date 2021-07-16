import { Flex } from '@chakra-ui/react'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { BurrowRowState } from '../state/burrow-state.type'
import { useGetAllBurrows } from '../state/useGetAllBurrowsSelector.hook'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowListItemCard } from './burrow-list-item/burrow-list-item-card'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useGetAllBurrows()
  const { address: walletAddress } = useGetWallet()

  // eslint-disable-next-line
  // @ts-ignore
  const { address } = useParams()

  const walletBurrows = burrows.filter(
    (burrow) => burrow.walletAddress === walletAddress && burrow.scAddress === address,
  )

  if (!walletBurrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <Flex flexWrap={'wrap'}>
      {walletBurrows.map((burrow: BurrowRowState) => (
        <BurrowListItemCard key={burrow.burrowId} burrow={burrow} />
      ))}
    </Flex>
  )
}
