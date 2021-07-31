import { Login } from '@auth'
import { useRouteParams } from '@config'
import { PageNotFound } from '@shared/ui'
import { isValidWalletAddress, useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'

type Props = {
  checkIsUserConnected: boolean
  checkIsValidChecker: boolean
}

export const ValidatePageWrapper: FunctionComponent<Props> = ({
  checkIsUserConnected,
  checkIsValidChecker,
  children,
}) => {
  const { address: walletAddress } = useGetWallet()
  const { checker } = useRouteParams()

  if (checkIsValidChecker) {
    if (!checker) {
      return <PageNotFound />
    }

    if (!checkIsUserConnected) {
      return <>{children}</>
    }
  }

  return isValidWalletAddress(walletAddress) ? <>{children}</> : <Login />
}
