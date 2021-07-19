import { ButtonProps } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent, useMemo } from 'react'
import { UserConnectedActionButton } from './user-connected-action-button'
import { UserNotConnectedActionButton } from './user-not-connected-action-button'

export interface ActionButtonProps extends ButtonProps {
  label: string
  onClick: () => void
}

export const ActionButton: FunctionComponent<ActionButtonProps> = (props) => {
  const walletData = useGetWallet()
  const initalWalletStatus = useMemo(() => walletData.status, [])
  console.log('walletData', 'initalWalletStatus, ', initalWalletStatus, walletData)

  return initalWalletStatus === RequestStatus.success ? (
    <UserConnectedActionButton {...props} />
  ) : (
    <UserNotConnectedActionButton {...props} />
  )
}

//  ActionButton.displayName = 'ActionButton'
