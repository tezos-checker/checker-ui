import { Button } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ActionButtonProps } from '@form'
import { useConnectWallet, useGetWallet } from '@wallet'
import React, { FunctionComponent, useEffect } from 'react'

export const UserNotConnectedActionButton: FunctionComponent<ActionButtonProps> = ({
  label,
  onClick,
  isLoading,
  ...rest
}) => {
  const walletData = useGetWallet()
  const connectWallet = useConnectWallet()

  useEffect(() => {
    if (walletData.status === RequestStatus.success) {
      onClick()
    }
  }, [walletData])

  return (
    <Button
      isLoading={isLoading || walletData.status === RequestStatus.pending}
      // if the tx fails, the user can be connected raeson why we check walletData.status
      onClick={walletData.status === RequestStatus.success ? onClick : connectWallet}
      {...rest}
    >
      {label}
    </Button>
  )
}
//
