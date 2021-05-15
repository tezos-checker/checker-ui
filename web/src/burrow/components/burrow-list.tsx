import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../state/burrow-state.type'
import { useBurrowData } from '../state/burrow.selector'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowListItemCard } from './burrow-list-item/burrow-list-item-card'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useBurrowData()

  if (!burrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <Flex flexWrap={'wrap'}>
      {burrows.map((burrow: BurrowRowState) => (
        <BurrowListItemCard key={burrow.burrowId} {...burrow} />
      ))}
    </Flex>
  )
}
