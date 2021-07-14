import { HStack } from '@chakra-ui/react'
import { mockedCheckers } from '@config'
import React, { FunctionComponent } from 'react'
import { CheckerCard } from './checker-card.component'
import { CheckerSelected } from './checker-selected.component'

export const CheckerList: FunctionComponent = () => (
  <HStack>
    {mockedCheckers.map((checker) => (
      <CheckerCard key={checker.address} checker={checker} />
    ))}

    <CheckerSelected title="KIT" oracle="abcdefgh" address="KT1PPL3svzkumTQfq4aXm9LfPnocAMCYQN2w" />
  </HStack>
)
