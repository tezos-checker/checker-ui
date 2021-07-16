/* eslint-disable */
import { VStack } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { CheckerRoute, checkerRoutes } from '../../config/routing/checker-routes'

export const PageMenu: FunctionComponent = () => (
  <VStack>
    {checkerRoutes.map((route: CheckerRoute, index: number) => (
      <route.menu key={route.path} />
    ))}
  </VStack>
)
