/* eslint-disable */
import { VStack } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { AppRoute } from '../../src/routing/app-routes.constant'
import { useAppRoutes } from '../../src/routing/app-routes.hook'

export const MenuMock: FunctionComponent = () => {
  const { appRoutes } = useAppRoutes()

  return (
    <VStack>
      {appRoutes.map((route: AppRoute, index: number) => (
        <route.menu />
      ))}
    </VStack>
  )
}
