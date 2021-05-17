import { Box, Button, useMultiStyleConfig } from '@chakra-ui/react'
import { isPendingRequest } from '@shared/utils'
import { useConnectWallet, useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'
import tezos from '../assets/images/tez.svg'

export const Login: FunctionComponent = () => {
  const walletData = useGetWallet()
  const connectWallet = useConnectWallet()

  const style = useMultiStyleConfig('ui/login', {})

  return (
    <Box sx={style.container}>
      <img src={tezos} />
      <Button
        sx={style.button}
        isLoading={isPendingRequest(walletData.status)}
        size={'lg'}
        onClick={connectWallet}
      >
        Login
      </Button>
    </Box>
  )
}
