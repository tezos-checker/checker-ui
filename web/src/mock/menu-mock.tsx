/* eslint-disable */
import { VStack } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { CheckerRoute } from '../config/routing/checker-routes'
import { useCheckerRoute } from '../config/routing/useCheckerRoute.hook'

export const MenuMock: FunctionComponent = () => {
  const { checkerRoutes } = useCheckerRoute()

  return (
    <VStack>
      {checkerRoutes.map((route: CheckerRoute, index: number) => (
        <route.menu />
      ))}
    </VStack>
  )
}
