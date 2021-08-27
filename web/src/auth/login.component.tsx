import { Box, Image, useMultiStyleConfig } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import tezos from '../assets/images/tez.svg'
import { LoginButton } from './login-button.component'

export const Login: FunctionComponent = () => {
  const style = useMultiStyleConfig('ui/login', {})

  return (
    <Box sx={style.container}>
      <Image src={tezos} mb="25px" />
      <LoginButton />
    </Box>
  )
}
