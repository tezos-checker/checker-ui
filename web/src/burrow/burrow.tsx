import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowItem } from './components/burrow-item/burrow-item'
import { BurrowItemInProgress } from './components/burrow-item/burrow-item-in-progress'

export const Burrow: FunctionComponent = () => (
  <Flex>
    <BurrowItem />
    <BurrowItemInProgress />
  </Flex>
)
