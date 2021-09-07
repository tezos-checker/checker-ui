import { Button } from '@chakra-ui/react'
import { isPendingRequest } from '@shared/utils'
import { useConnectWallet, useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'

export const LoginButton: FunctionComponent = () => {
  const walletData = useGetWallet()
  const connectWallet = useConnectWallet()

  return (
    <Button
      colorScheme="blue"
      isLoading={isPendingRequest(walletData.status)}
      onClick={connectWallet}
    >
      Login
    </Button>
  )
}
