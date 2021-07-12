import { RequestStatus } from '@config'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent, useMemo } from 'react'
import { UserConnectedActionButton } from './user-connected-action-button'
import { UserNotConnectedActionButton } from './user-not-connected-action-button'

type Props = {
  label: string
  isDisabled: boolean
  isLoading: boolean
  onClick: () => void
}

export const ActionButton: FunctionComponent<Props> = (props) => {
  const walletData = useGetWallet()
  const initalWalletStatus = useMemo(() => walletData.status, [])

  return initalWalletStatus === RequestStatus.success ? (
    <UserConnectedActionButton {...props} />
  ) : (
    <UserNotConnectedActionButton {...props} />
  )
}

//  ActionButton.displayName = 'ActionButton'
