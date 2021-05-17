import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../state/burrow-state.type'
import { useGetAllBurrows } from '../state/useGetAllBurrowsSelector.hook'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowListItemCard } from './burrow-list-item/burrow-list-item-card'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useGetAllBurrows()

  if (!burrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <Flex flexWrap={'wrap'}>
      {burrows.map((burrow: BurrowRowState) => (
        <BurrowListItemCard key={burrow.burrowId} burrow={burrow} />
      ))}
    </Flex>
  )
}
