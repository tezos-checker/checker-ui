import { HStack } from '@chakra-ui/react'
import { appNetwork } from '@wallet'
import React, { FunctionComponent } from 'react'
import { CheckerCard } from '../checker-card/checker-card.component'

export const CheckerList: FunctionComponent = () => (
  <HStack>
    {appNetwork.checkers.map((checker) => (
      <CheckerCard key={checker.address} checker={checker} />
    ))}
  </HStack>
)
