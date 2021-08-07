import { HStack } from '@chakra-ui/react'
import { mockedCheckers } from '@config'
import React, { FunctionComponent } from 'react'
import { CheckerCard } from '../checker-card/checker-card.component'

export const CheckerList: FunctionComponent = () => (
  <HStack>
    {mockedCheckers.map((checker) => (
      <CheckerCard key={checker.address} checker={checker} />
    ))}
  </HStack>
)
