import { HStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { CheckerCard } from './checker-card.component'
import { CheckerSelected } from './checker-selected.component'

export const CheckerList: FunctionComponent = () => (
  <HStack>
    <CheckerCard title="KIT" title2="KIT/TEZOS" oracle="abcdefgh" token="sdsqdsqdsq" />
    <CheckerSelected title="KIT" oracle="abcdefgh" token="sdsqdsqdsq" />
  </HStack>
)
