/* eslint-disable */
import { VStack } from '@chakra-ui/layout'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'
import { CheckerRoute } from '../../config/routing/checker-routes'
import { useCheckerRoute } from '../../config/routing/useCheckerRoute.hook'

export const PageMenu: FunctionComponent = () => {
  const walletData = useGetWallet()

  const UserMenu: FunctionComponent = () => {
    const { checkerRoutes } = useCheckerRoute()
    return (
      <VStack>
        {checkerRoutes.map((route: CheckerRoute, index: number) => (
          <route.menu key={route.path} />
        ))}
      </VStack>
    )
  }

  return walletData.address ? <UserMenu /> : null
}
