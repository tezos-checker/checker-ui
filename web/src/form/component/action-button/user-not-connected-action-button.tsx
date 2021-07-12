import { Button } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useConnectWallet, useGetWallet } from '@wallet'
import React, { FunctionComponent, useEffect } from 'react'

type Props = {
  label: string
  isDisabled: boolean
  isLoading: boolean
  onClick: () => void
}

export const UserNotConnectedActionButton: FunctionComponent<Props> = ({
  label,
  isDisabled,
  isLoading,
  onClick,
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
      mt="15px"
      disabled={isDisabled}
      isLoading={isLoading || walletData.status === RequestStatus.pending}
      // if the tx fails, the user can be connected raeson why we check walletData.status
      onClick={walletData.status === RequestStatus.success ? onClick : connectWallet}
    >
      {label}
    </Button>
  )
}
//
