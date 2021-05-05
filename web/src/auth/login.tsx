import { Box, Button } from '@chakra-ui/react'
import { isPendingRequest } from '@shared/utils'
import { useDispatchLoadWallet, useWalletData } from '@wallet'
import React, { FunctionComponent } from 'react'

export const Login: FunctionComponent = () => {
  const walletData = useWalletData()
  const loadWallet = useDispatchLoadWallet()

  return (
    <Box width={['80vw', '300px']} p={'10px'} textAlign={'center'}>
      <img src="https://tezos.com/img/tez.svg" />
      <Button
        mt={'25px'}
        isLoading={isPendingRequest(walletData.status)}
        size={'lg'}
        onClick={loadWallet}
      >
        Login
      </Button>
    </Box>
  )
}
