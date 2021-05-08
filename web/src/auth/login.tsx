import { Box, Button, useMultiStyleConfig } from '@chakra-ui/react'
import { isPendingRequest } from '@shared/utils'
import { useDispatchLoadWallet, useWalletData } from '@wallet'
import React, { FunctionComponent } from 'react'
import tezos from '../assets/images/tez.svg'

export const Login: FunctionComponent = () => {
  const walletData = useWalletData()
  const loadWallet = useDispatchLoadWallet()

  const style = useMultiStyleConfig('ui/login', {})

  return (
    <Box sx={style.container}>
      <img src={tezos} />
      <Button
        sx={style.button}
        isLoading={isPendingRequest(walletData.status)}
        size={'lg'}
        onClick={loadWallet}
      >
        Login
      </Button>
    </Box>
  )
}
